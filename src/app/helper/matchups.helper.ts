const matchUpMetrics: MatchUpMetrics = {
  passing: {
    netPassingYards: {
      name: 'Passing Yards',
      value: 1,
      perYard: 20,
      total: false
    },
    passingTDs: {
      name: 'Passing TDs',
      value: 6,
      perYard: 0,
      total: true
    }
  },
  rushing: {
    rushingYards: {
      name: 'Rushing Yards',
      value: 1,
      perYard: 10,
      total: false
    },
    rushingTDs: {
      name: 'Rushing TDs',
      value: 6,
      perYard: 0,
      total: true
    }
  },
  defense: {
    sacks: {
      name: 'Sacks',
      value: 2,
      perYard: 0,
      total: true
    },
    interceptions: {
      name: 'Interceptions',
      value: 3,
      perYard: 0,
      total: true
    },
    fumblesRecovered: {
      name: 'Fumbles Recovered',
      value: 3,
      perYard: 0,
      total: true
    },
    defensiveTDs: {
      name: 'Defensive TDs',
      value: 6,
      perYard: 0,
      total: true
    }
  }
}

const week4Matchup = [
 {
    squadUID: 'mLjGwubov66ji4fPIRSI',
    rushingTeam: 'kent state',
    passingTeam: 'arkansas state',
    defensiveTeam: 'texas a&m'
  },
 {
    squadUID: 'EcdJ4qnzOVITIEJUPpyP',
    rushingTeam: 'wisconsin',
    passingTeam: 'mississippi state',
    defensiveTeam: 'costal carolina'
  }
]

const getStatsForCurrentMatchup = (currentMatchup: Array<Matchups>, gamesStats: Array<GameTeamStat>) => {

}

interface Matchups {
  squadUID: string,
  rushingTeam: string,
  passingTeam: string,
  defensiveTeam: string
}

interface MatchUpMetrics {
  passing: {
    netPassingYards: MatchupScoring,
    passingTDs: MatchupScoring
  },
  rushing: {
    rushingYards: MatchupScoring,
    rushingTDs: MatchupScoring
  },
  defense: {
    sacks: MatchupScoring,
    interceptions: MatchupScoring,
    fumblesRecovered: MatchupScoring,
    defensiveTDs: MatchupScoring
  }
}

interface MatchupScoring {
      name: string,
      value: number,
      perYard: number,
      total: boolean
    }


interface GameStat {
      "id": number,
      "teams": Array<GameTeamStat>
}

interface GameTeamStat {
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
const categories = [
  'tacklesForLoss',
  'defensiveTDs',
  'tackles',
  'sacks',
  'qbHurries',
  'passesDeflected',
  'fumblesRecovered',
  'rushingTDs',
  'passingTDs',
  'kickingPoints',
  'possessionTime',
  'interceptions',
  'fumblesLost',
  'turnovers',
  'totalPenaltiesYards',
  'yardsPerRushAttempt',
  'rushingAttempts',
  'rushingYards',
  'yardsPerPass',
  'completionAttempts',
  'netPassingYards',
  'totalYards',
  'fourthDownEff',
  'thirdDownEff',
  'firstDowns',
]
