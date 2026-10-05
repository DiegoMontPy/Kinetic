export interface TeamMember {
  name: string;
  role: string;
  subsystemId: string;
}

/** Written as they read inside a sentence on Únete: "Nos reunimos los sábados, a las 9:00, en el taller". */
export interface Meetings {
  /** "los sábados" */
  day: string;
  /** "9:00" */
  time: string;
  /** "el taller del Key Institute" */
  place: string;
}

export interface Team {
  activeMembers: number;
  /** Pending: member names and roles are not published yet. */
  members: TeamMember[];
  /**
   * Pending: the team does not have a public email address yet, and the site leaves it out while null.
   * Once set, it appears on Contacto and on the sponsorship band of Inicio and Sponsors.
   */
  email: string | null;
  /** Pending: meeting day, time and place are not defined yet. */
  meetings: Meetings | null;
}

export const team: Team = {
  activeMembers: 14,
  members: [],
  email: null,
  meetings: null,
};
