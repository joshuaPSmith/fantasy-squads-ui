import { WeeklyMatchupInfo } from './matchups.model';
export interface League {
  users: Array<string>,
  uid: string,
  matchups: Array<WeeklyMatchupInfo>,
  squads: Array<UsersSquad>,
  leagueName: string
}

export interface LoggedInUser {
  defaultLeague: string,
  email: string,
  displayName: string,
  emailVerified: boolean,
  uid: string,
  photoURL?: string
}

export interface UsersSquad {
  uid: string,
  name: string,
  teamsList: Array<string>,
  ownerID: string
}
