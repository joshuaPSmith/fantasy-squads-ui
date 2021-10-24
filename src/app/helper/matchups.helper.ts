import { teamStats } from './../../assets/teamStats';
import { MatchUpMetrics, Matchups, GameTeamStat, GameStat, MatchupScoring, WeeklyMatchupInfo, ExpandedMatchup } from './../models/matchups.model';

const matchupCategories: any = {
  'passingTeam': ['netPassingYards', 'passingTDs'],
  'rushingTeam': ['rushingYards', 'rushingTDs'],
  'defensiveTeam': ['sacks', 'interceptions', 'fumblesRecovered', 'defensiveTDs']
}
const matchUpMetrics: MatchUpMetrics = {
  passingTeam: {
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
  rushingTeam: {
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
  defensiveTeam: {
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


export const getStatsForCurrentMatchup = (currentMatchup: Array<Matchups>, gamesStats: Array<GameStat>) => {
  // get map of all of the teams used in current matchups so we know to use them
  const teamsMap = makeMapOfMatchupTeams(currentMatchup);

  // this is the map that we are building out with our teams and stats
  const statsMap: Map<string, Array<{ "category": "string", "stat": "string" }>> = new Map();

  // go through the games and look for the teams we are interested in
  gamesStats.forEach((gameStat) => {
    // Each game has two teams
    gameStat.teams.forEach(teamStat => {
      const teamsMatchupCategory: any = teamsMap.get(teamStat.school);

      if (teamsMatchupCategory) {
        // This is a team we are interested in

        // we need to get the stats that we are interested in
        const categoriesForTeam: Array<string> = matchupCategories[teamsMatchupCategory];

        // Lets get the stat we are interested in
        const stats = teamStat.stats.filter(stat => categoriesForTeam.includes(stat.category));

        // confirm we have the stat
        if (stats.length) {
          // now set it to map
          statsMap.set(teamStat.school, stats);
        }
      }
    })
  });

  return statsMap;
}

export const getMatchUpValuesForTeams = (currentMatch: Array<Matchups>, statsMap: Map<string, Array<{ "category": "string", "stat": "string" }>>) => {
  currentMatch.forEach(matchup => {
    // const expandedMatchup: ExpandedMatchup = { ...matchup, categoryBreakdown: []}
    matchup.selectedSquads.forEach(matchupInfo => {
      const teamStats = statsMap.get(matchupInfo.team);
      matchupInfo.categoryBreakdown = [];

      teamStats?.forEach(categoryStat => {
        // TODO add type
        const metric = (matchUpMetrics as any)[matchupInfo.category][categoryStat.category];
        const calculatedPoints = calculatePoints(metric, parseInt(categoryStat.stat));
        console.log('#POINTS#', categoryStat.category, categoryStat.stat)
        const test = {subCategory: metric.name, pointTotal: calculatedPoints, statTotal: parseInt(categoryStat.stat)};
        console.log('#TEST#', test);
        matchupInfo.categoryBreakdown?.push(test)

        matchupInfo.points += calculatedPoints;
      })

      console.log('#WHY#', matchupInfo.categoryBreakdown)
    })
  });

  // TODO: I think this is not immutable
  return currentMatch;
}

const calculatePoints = (metric: MatchupScoring, value: number) => {
  if (metric.total) {
    return value * metric.value
  } else {
    return (value / metric.perYard) * metric.value
  }
}

const makeMapOfMatchupTeams = (currentMatchup: Array<Matchups>) => {
  const teamsMap = new Map();

  currentMatchup.forEach(matchup => {
    matchup.selectedSquads.forEach(teamInfo => {
      teamsMap.set(teamInfo.team, teamInfo.category)
    })
  });

  return teamsMap;
}

// TODO: Remove this later
// export const week4 = {
//   week: 4,
//   active: false,
//   past: true,
//   matchups: {
//     matchup1: [
//       {
//         squadUID: 'mLjGwubov66ji4fPIRSI',
//         squads:
//           [{ category: 'rushingTeam', team: 'Kent State', points: 0 },
//           { category: 'passingTeam', team: 'Arkansas State', points: 0 },
//           { category: 'defensiveTeam', team: 'Texas A&M', points: 0 }],
//         matchupTotal: 0
//       },
//       {
//         squadUID: 'EcdJ4qnzOVITIEJUPpyP',
//         squads:
//           [{ category: 'rushingTeam', team: 'Wisconsin', points: 0 },
//           { category: 'passingTeam', team: 'Mississippi State', points: 0 },
//           { category: 'defensiveTeam', team: 'Coastal Carolina', points: 0 }],
//         matchupTotal: 0
//       }
//     ]
//   }
// }
export const week5: WeeklyMatchupInfo = {
  week: 5,
  active: false,
  past: true,
  squadMatchups:
    [
      {
        weeklyMatchup: [
          {
            squadUID: 'mLjGwubov66ji4fPIRSI', //Josh
            selectedSquads:
              [{ category: 'rushingTeam', team: 'Kent State', points: 0 },
              { category: 'passingTeam', team: 'Arkansas State', points: 0 },
              { category: 'defensiveTeam', team: 'Texas A&M', points: 0 }],
            matchupTotal: 0
          },
          {
            squadUID: '52X2QiXz7OCrNRpjjt2U', //Tyler D
            selectedSquads:
              [{ category: 'rushingTeam', team: 'Appalachian State', points: 0 },
              { category: 'passingTeam', team: 'North Carolina', points: 0 },
              { category: 'defensiveTeam', team: 'Ohio State', points: 0 }],
            matchupTotal: 0
          },
        ]
      },
      {
        weeklyMatchup: [
          {
            squadUID: 'o6WsnetFzo0xfi0DgPKa', //Justin
            selectedSquads:
              [{ category: 'rushingTeam', team: 'Army', points: 0 },
              { category: 'passingTeam', team: 'Notre Dame', points: 0 },
              { category: 'defensiveTeam', team: 'BYU', points: 0 }],
            matchupTotal: 0
          },
          {
            squadUID: 'EcdJ4qnzOVITIEJUPpyP', //Ben
            selectedSquads:
              [{ category: 'rushingTeam', team: 'Coastal Carolina', points: 0 },
              { category: 'passingTeam', team: 'Mississippi State', points: 0 },
              { category: 'defensiveTeam', team: 'Clemson', points: 0 }],
            matchupTotal: 0
          },
        ]
      }
    ]
}
// export const week6: WeeklyMatchupInfo = {
//   week: 6,
//   active: false,
//   past: false,
//   squadMatchups:
//     [
//       {
//         weeklyMatchup: [
//           {
//             squadUID: 'mLjGwubov66ji4fPIRSI', //Josh
//             selectedSquads:
//               [{ category: 'rushingTeam', team: 'Kent State', points: 0 },
//               { category: 'passingTeam', team: 'Nevada', points: 0 },
//               { category: 'defensiveTeam', team: 'Cincinnati', points: 0 }],
//             matchupTotal: 0
//           },
//           {
//             squadUID: 'o6WsnetFzo0xfi0DgPKa', //Justin
//             selectedSquads:
//               [{ category: 'rushingTeam', team: 'Army', points: 0 },
//               { category: 'passingTeam', team: 'Notre Dame', points: 0 },
//               { category: 'defensiveTeam', team: 'BYU', points: 0 }],
//             matchupTotal: 0
//           },
//         ]
//       },
//       {
//         weeklyMatchup: [
//           {
//             squadUID: '52X2QiXz7OCrNRpjjt2U', //Tyler
//             selectedSquads:
//               [{ category: 'rushingTeam', team: 'Arizona State', points: 0 },
//               { category: 'passingTeam', team: 'Ohio State', points: 0 },
//               { category: 'defensiveTeam', team: 'Penn State', points: 0 }],
//             matchupTotal: 0
//           },
//           {
//             squadUID: 'EcdJ4qnzOVITIEJUPpyP', //Ben
//             selectedSquads:
//               [{ category: 'rushingTeam', team: 'Coastal Carolina', points: 0 },
//               { category: 'passingTeam', team: 'Marshall', points: 0 },
//               { category: 'defensiveTeam', team: 'Wisconsin', points: 0 }],
//             matchupTotal: 0
//           },
//         ]
//       }
//     ]
// }

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
