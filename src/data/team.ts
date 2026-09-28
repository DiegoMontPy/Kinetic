export interface TeamMember {
  name: string;
  role: string;
  subsystemId: string;
}

export interface Meetings {
  day: string;
  time: string;
  place: string;
}

export interface Team {
  activeMembers: number;
  /** Pending: member names and roles are not published yet. */
  members: TeamMember[];
  /** Pending: the team does not have a public email address yet. */
  email: string | null;
  /** Pending: meeting day, time and place are not defined yet. */
  meetings: Meetings | null;
}

export const team: Team = {
  activeMembers: 13,
  members: [],
  email: null,
  meetings: null,
};
