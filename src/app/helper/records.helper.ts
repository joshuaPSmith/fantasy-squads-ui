import Squad from "../models/squad.model";

export interface TeamRecord {
  year: number,
  team: string,
  conference: string,
  division: string,
  expectedWins: number,
  total: {
    games: number,
    wins: number,
    losses: number,
    ties: number,
  },
  conferenceGames: {
    games: number,
    wins: number,
    losses: number,
    ties: number,
  },
  homeGames: {
    games: number,
    wins: number,
    losses: number,
    ties: number,
  },
  awayGames: {
    games: number,
    wins: number,
    losses: number,
    ties: number,
  }
};


export const pruneRecords = (records: TeamRecord[], squads: Squad[]) => {
  console.log('Made it here')
  const prunedRecordsMap: Map<string, TeamRecord> = new Map();
  records.forEach(record => {
    if (squads.some(squad => squad.teamsList.some(team => team === record.team))) {
      prunedRecordsMap.set(record.team, record);
    }
  });

  return prunedRecordsMap;
}

export const calculateSquadWins = (recordsMap: Map<string, TeamRecord>, squads: Squad[]): Map<string, number> => {
  const squadWinsMap = new Map();
  squads.forEach(squad => {
    squadWinsMap.set(squad.name, 0);
    squad.teamsList.forEach(team => {
      const wins = recordsMap.get(team)?.total.wins;
      const squadPoints = squadWinsMap.get(squad.name) + wins;

      squadWinsMap.set(squad.name, squadPoints);
    });
  });

  return squadWinsMap;
}
