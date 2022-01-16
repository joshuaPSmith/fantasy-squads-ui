export interface WeeklyMatchupInfo {
  week: number,
      squadMatchups: Array<{weeklyMatchup: Array<SquadMatchupInformation>}>,
      active: boolean,
      past: boolean,
}

export interface SquadMatchupInformation {
  squadUID: string,
  selectedTeam: Array<
  {
    category: string,
    team: string,
    points: number,
    categoryBreakdown?: Array<{
      statTotal: number,
      pointTotal: number,
      subCategory: string
    }>
  }
  >,
  matchupTotal: number
}

export interface ExpandedMatchup extends SquadMatchupInformation {

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
