"""Render the KR-01 chassis into transparent PNGs for the website.

Usage:
    blender -b path/to/Chasis.blend -P scripts/render-chassis.py [-- --out DIR]
"""

import argparse
import math
import sys
from pathlib import Path

import bpy
import numpy as np
from mathutils import Vector

RESOLUTION = (2400, 1800)
LENS_MM = 70.0
SENSOR_MM = 36.0
ELEVATION_DEG = 20.0
# Minimum empty border on every side, as a fraction of the frame height.
MARGIN = 0.07
SAMPLES = 512

# The model's nose points to -X, so an azimuth of 180 degrees faces it head-on.
FRONT_AZIMUTH_DEG = 180.0
VIEWS = (
    ("kr01-chassis-render.png", 45.0),
    ("kr01-chassis-lateral.png", 90.0),
    ("kr01-chassis-trasera.png", 135.0),
)

# #006DFF converted from sRGB to linear, since light colors are scene-linear.
ACCENT_LINEAR = (0.0, 0.153, 1.0)
KEY_POWER_W = 2400.0
RIM_POWER_W = 4000.0
# Blue carries little luminance, so the accent rim needs extra power to match.
ACCENT_RIM_POWER_W = 16000.0
# A faint environment keeps the far tubes from dissolving into the black page.
WORLD_STRENGTH = 0.03


def parse_args():
    argv = sys.argv[sys.argv.index("--") + 1 :] if "--" in sys.argv else []
    parser = argparse.ArgumentParser(prog="render-chassis")
    parser.add_argument(
        "--out",
        type=Path,
        default=Path(__file__).resolve().parent.parent / "src" / "assets",
    )
    return parser.parse_args(argv)


def renderable_meshes(scene):
    return [o for o in scene.objects if o.type == "MESH" and not o.hide_render and o.visible_get()]


def node_tree_of(datablock):
    if datablock.node_tree is None:
        datablock.use_nodes = True
    return datablock.node_tree


def make_steel():
    material = bpy.data.materials.new("KR Steel")
    tree = node_tree_of(material)
    tree.nodes.clear()
    bsdf = tree.nodes.new("ShaderNodeBsdfPrincipled")
    output = tree.nodes.new("ShaderNodeOutputMaterial")
    tree.links.new(bsdf.outputs["BSDF"], output.inputs["Surface"])
    bsdf.inputs["Base Color"].default_value = (0.56, 0.57, 0.58, 1.0)
    bsdf.inputs["Metallic"].default_value = 0.9
    bsdf.inputs["Roughness"].default_value = 0.4
    return material


def ensure_materials(objects):
    steel = None
    for obj in objects:
        if obj.material_slots and all(slot.material for slot in obj.material_slots):
            continue
        steel = steel or make_steel()
        if not obj.material_slots:
            obj.data.materials.append(steel)
        for slot in obj.material_slots:
            if slot.material is None:
                slot.material = steel


def world_points(objects):
    depsgraph = bpy.context.evaluated_depsgraph_get()
    chunks = []
    for obj in objects:
        evaluated = obj.evaluated_get(depsgraph)
        mesh = evaluated.to_mesh()
        coords = np.empty(len(mesh.vertices) * 3, dtype=np.float32)
        mesh.vertices.foreach_get("co", coords)
        evaluated.to_mesh_clear()
        matrix = np.array(obj.matrix_world, dtype=np.float64)
        chunks.append(coords.reshape(-1, 3) @ matrix[:3, :3].T + matrix[:3, 3])
    return np.concatenate(chunks)


def view_basis(azimuth_deg):
    az, el = math.radians(azimuth_deg), math.radians(ELEVATION_DEG)
    to_camera = Vector((math.cos(el) * math.cos(az), math.cos(el) * math.sin(az), math.sin(el)))
    forward = -to_camera
    right = forward.cross(Vector((0.0, 0.0, 1.0))).normalized()
    up = right.cross(forward).normalized()
    return forward, right, up


def fit_camera(points, center, forward, right, up):
    """Return the camera distance and lens shift that frame every point with an even margin."""
    rel = points - np.array(center)
    x, y, z = rel @ np.array(right), rel @ np.array(up), rel @ np.array(forward)

    width, height = RESOLUTION
    half_w = (SENSOR_MM / 2.0) / LENS_MM
    half_h = half_w * height / width
    margin_px = MARGIN * height
    avail_w = half_w * (1.0 - 2.0 * margin_px / width)
    avail_h = half_h * (1.0 - 2.0 * margin_px / height)

    def projected(distance):
        depth = distance + z
        return x / depth, y / depth

    def fits(distance):
        tx, ty = projected(distance)
        return np.ptp(tx) / 2.0 <= avail_w and np.ptp(ty) / 2.0 <= avail_h

    lo = float(-z.min()) + 1e-3
    hi = lo + 100.0 * float(np.ptp(points, axis=0).max())
    for _ in range(60):
        mid = (lo + hi) / 2.0
        if fits(mid):
            hi = mid
        else:
            lo = mid

    # Lens shift recenters the silhouette without altering perspective.
    tx, ty = projected(hi)
    shift_x = (tx.max() + tx.min()) / 2.0 / (2.0 * half_w)
    shift_y = (ty.max() + ty.min()) / 2.0 / (2.0 * half_w)
    return hi, float(shift_x), float(shift_y)


def aim(obj, target):
    obj.rotation_euler = (target - obj.location).to_track_quat("-Z", "Y").to_euler()


def build_lights(scene):
    for obj in [o for o in scene.objects if o.type == "LIGHT"]:
        bpy.data.objects.remove(obj, do_unlink=True)

    lights = {}
    for name, color, power in (
        ("KR Key", (1.0, 1.0, 1.0), KEY_POWER_W),
        ("KR Rim", (1.0, 1.0, 1.0), RIM_POWER_W),
        ("KR Rim Accent", ACCENT_LINEAR, ACCENT_RIM_POWER_W),
    ):
        data = bpy.data.lights.new(name, type="AREA")
        data.color = color
        data.energy = power
        obj = bpy.data.objects.new(name, data)
        scene.collection.objects.link(obj)
        lights[name] = obj
    return lights


def place_lights(lights, center, forward, right, scale):
    """Soft key from the camera side; two hard rims behind the chassis carve out the tubes."""
    up = Vector((0.0, 0.0, 1.0))
    layout = {
        "KR Key": (center - forward * 1.4 * scale - right * 0.8 * scale + up * 1.3 * scale, 1.4 * scale),
        "KR Rim": (center + forward * 0.7 * scale - right * 1.4 * scale + up * 0.6 * scale, 0.4 * scale),
        "KR Rim Accent": (center + forward * 0.7 * scale + right * 1.4 * scale + up * 0.6 * scale, 0.4 * scale),
    }
    for name, (position, size) in layout.items():
        obj = lights[name]
        obj.location = position
        obj.data.size = size
        aim(obj, center)


def build_world(scene):
    world = bpy.data.worlds.new("KR Studio")
    tree = node_tree_of(world)
    tree.nodes.clear()
    background = tree.nodes.new("ShaderNodeBackground")
    output = tree.nodes.new("ShaderNodeOutputWorld")
    tree.links.new(background.outputs["Background"], output.inputs["Surface"])
    background.inputs["Color"].default_value = (1.0, 1.0, 1.0, 1.0)
    background.inputs["Strength"].default_value = WORLD_STRENGTH
    scene.world = world


def enable_gpu():
    prefs = bpy.context.preferences.addons["cycles"].preferences
    for backend in ("OPTIX", "CUDA", "HIP", "ONEAPI", "METAL"):
        try:
            prefs.compute_device_type = backend
        except TypeError:
            continue
        prefs.get_devices()
        if any(d.type == backend for d in prefs.devices):
            for device in prefs.devices:
                device.use = device.type == backend
            return True
    return False


def configure_render(scene):
    render = scene.render
    render.engine = "CYCLES"
    render.resolution_x, render.resolution_y = RESOLUTION
    render.resolution_percentage = 100
    render.film_transparent = True
    render.image_settings.file_format = "PNG"
    render.image_settings.color_mode = "RGBA"
    render.image_settings.color_depth = "8"
    scene.view_settings.view_transform = "AgX"
    scene.view_settings.exposure = 0.0

    cycles = scene.cycles
    cycles.device = "GPU" if enable_gpu() else "CPU"
    cycles.samples = SAMPLES
    cycles.use_adaptive_sampling = True
    cycles.adaptive_threshold = 0.005
    cycles.use_denoising = True
    cycles.max_bounces = 8
    cycles.glossy_bounces = 6


def main():
    args = parse_args()
    args.out.mkdir(parents=True, exist_ok=True)
    scene = bpy.context.scene

    meshes = renderable_meshes(scene)
    if not meshes:
        raise SystemExit("No renderable mesh found in the .blend file.")
    ensure_materials(meshes)

    points = world_points(meshes)
    low, high = points.min(axis=0), points.max(axis=0)
    center = Vector(((low + high) / 2.0).tolist())
    scale = float(np.linalg.norm(high - low))

    configure_render(scene)
    build_world(scene)
    lights = build_lights(scene)

    camera_data = bpy.data.cameras.new("KR Camera")
    camera_data.lens = LENS_MM
    camera_data.sensor_fit = "HORIZONTAL"
    camera_data.sensor_width = SENSOR_MM
    camera = bpy.data.objects.new("KR Camera", camera_data)
    scene.collection.objects.link(camera)
    scene.camera = camera

    for filename, offset in VIEWS:
        forward, right, up = view_basis(FRONT_AZIMUTH_DEG + offset)
        distance, shift_x, shift_y = fit_camera(points, center, forward, right, up)
        camera.location = center - forward * distance
        aim(camera, center)
        camera_data.shift_x, camera_data.shift_y = shift_x, shift_y
        camera_data.clip_end = distance + scale * 2.0
        place_lights(lights, center, forward, right, scale)

        scene.render.filepath = str(args.out / filename)
        bpy.ops.render.render(write_still=True)
        print(f"render-chassis: wrote {scene.render.filepath}")


main()
