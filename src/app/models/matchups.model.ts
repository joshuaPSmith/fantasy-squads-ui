export interface WeeklyMatchupInfo {
  week: number,
      squadMatchups: Array<{weeklyMatchup: Array<Matchups>}>,
      active: boolean,
      past: boolean,
}

export interface Matchups {
  squadUID: string,
  selectedSquads: Array<
  {
    category: string,
    team: string,
    points: number
  }
  >,
  matchupTotal: number
}

export interface MatchUpMetrics {
  passingTeam: {
    netPassingYards: MatchupScoring,
    passingTDs: MatchupScoring
  },
  rushingTeam: {
    rushingYards: MatchupScoring,
    rushingTDs: MatchupScoring
  },
  defensiveTeam: {
    sacks: MatchupScoring,
    interceptions: MatchupScoring,
    fumblesRecovered: MatchupScoring,
    defensiveTDs: MatchupScoring
  }
}

export interface MatchupScoring {
      name: string,
      value: number,
      perYard: number,
      total: boolean
    }


export interface GameStat {
      "id": number,
      "teams": Array<GameTeamStat>
}

export interface GameTeamStat {
    "school": "string",
    "conference": "string",
    "homeAway": true,
    "points": number,
    "stats": [
      {
        "category": "string",
        "stat": "string"
      }
    ]
}
