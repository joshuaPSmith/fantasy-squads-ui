import Squad from '../models/squad.model';
import teamStat from "../models/stats.model";

export interface SquadRankByCategory {
    categoryName: string,
    squads: Array<
        { squadID: string, squadName: string, rank: number, total: number }>
}

export interface SquadStandingsRank {
    squadName: string;
    squadID: string;
    squadStandings: number;
}

export interface DetailedSquads extends Squad {
    categoryMap: Map<string, Array<teamStat>>,
    categoryTotals: Array<
        {
            categoryName: string,
            total: number
        }
    >
}

// export interface SquadObject extends Squad {
//     teamMap: Map<any, any>;
//     categoryMap: Map<any, any>;
//     categoryTotals: { string: number }
// }

const statsToKeep = new Map()
statsToKeep.set('totalYards', true);
statsToKeep.set('rushingTDs', true);
statsToKeep.set('passingTDs', true);
statsToKeep.set('netPassingYards', true);
statsToKeep.set('rushingYards', true);

statsToKeep.set('thirdDownConversions', true);
// statsToKeep.set('turnovers', true); This is turnovers committed
statsToKeep.set('sacks', true);
statsToKeep.set('fumblesRecovered', true);
statsToKeep.set('passesIntercepted', true);
statsToKeep.set('puntReturnYards', true);


export const pruneStats = (rawStats: teamStat[], squads: Squad[]) => {
    let prunnedList: any = [];
    const teamsToKeep = createTeamsMap(squads);

    rawStats.forEach(stat => {
        if (statsToKeep.has(stat.statName) && teamsToKeep.has(stat.team)) {
            prunnedList.push(stat);
        }
    })
    return prunnedList;
}

// TODO get a better name
export const rankSquads = (prunedStats: teamStat[], squads: Squad[]) => {
    let squadObject: any = {};

    squads.forEach(squad => {
        // Create out object of the squads 
        const squadName = squad.name;
        squadObject = { ...squadObject, [squadName]: { ...squad, 'categoryMap': new Map(), categoryTotals: [] } }
    })

    const allTeamsMap = createTeamsMap(squads);

    // put each stat with the correct squad in a map keyed by the stat name
    prunedStats.forEach(stat => {
        // find out what squad the team that the stat is associated is on
        const squadAssociated = allTeamsMap.get(stat.team);

        // If we have the squad, add the category information to our object as a map
        if (squadAssociated) {
            // get the value that we currently have for that category
            const tempMapValue = squadObject[squadAssociated].categoryMap.get(stat.statName);

            // TODO I have to check if the value is there but should be able to do that easier 
            if (tempMapValue) {
                squadObject[squadAssociated].categoryMap.set(stat.statName, [...tempMapValue, stat])
            } else {
                squadObject[squadAssociated].categoryMap.set(stat.statName, [stat])
            }
        }
    })

    // combine the stats to get totals
    const keys = Object.keys(squadObject);
    // Go through each key (key will be squad names)
    keys.forEach(key => {
        // Go through each category and add up the values
        squadObject[key].categoryMap.forEach((value: Array<teamStat>, categoryKey: string) => {
            // Now go through each category and add values
            const reducer = (accumulator: number, currentValue: teamStat) => accumulator + currentValue.statValue;
            const categoryTotal = value.reduce(reducer, 0)

            // Copy whats there and add the new
            squadObject[key].categoryTotals = [...squadObject[key].categoryTotals, { categoryName: categoryKey, total: categoryTotal }];
        });
    })

    // TODO return less data and as an object
    return squadObject as DetailedSquads;
}

export const rankSquadsPerCategory = (detailedSquads: Array<DetailedSquads>) => {
    // create a map for the categories
    const categoryMap = new Map();

    // go through each squad
    detailedSquads.forEach(squad => {
        squad.categoryTotals.forEach(categoryTotal => {
            // add the totals to the map with the key as the category name (without losing the previous values)
            const tempData = categoryMap.has(categoryTotal.categoryName) ? categoryMap.get(categoryTotal.categoryName) : [];
            categoryMap.set(categoryTotal.categoryName, [...tempData, { 'squadID': squad.id, 'squadName': squad.name, 'total': categoryTotal.total, 'rank': 0 }]);
        })
    });

    // TODO I am doing this just to make it an array. i need to figure out how to iterate over an object better.
    let squadRankings: any = [];
    categoryMap.forEach((value: Array<{ squadName: string, total: number, rank: number, tieValue: number }>, key) => {
        const sorted = value.sort(sort);

        let rank = 1;
        for (let i = 0; i < sorted.length; i++) {
            // check for ties
            if (i > 0 && sorted[i].total === sorted[i - 1].total) {
                sorted[i].rank = sorted[i - 1].rank;
                sorted[i].tieValue = sorted[i].tieValue++ // still needs work. I need the tieValue to be the same for each that is tied
            } else {
                sorted[i].rank = rank;
                sorted[i].tieValue = 1;
            }
            rank++;
        }

        squadRankings.push({ categoryName: key, squads: sorted });
        categoryMap.set(key, sorted);
    })

    return squadRankings as SquadRankByCategory[];
}

export const getSquadStandings = (squadRankingsByCategory: Array<SquadRankByCategory>) => {
    let squadStandingsMap: Map<string, SquadStandingsRank> = new Map();

    // Go through each category
    squadRankingsByCategory.forEach(squadRank => {
        // Go through each team in that category 
        const rankingTotal = squadRank.squads.length;
        squadRank.squads.forEach(squad => {
            const tempValue = squadStandingsMap.get(squad.squadName);
            // the rankings total is the largest amount of points possible. Subtract the rank minus 1 to start at zero
            const currentCategoryStanding = rankingTotal - (squad.rank - 1);

            // Add to the value if its there or set the first one
            const newSquadStandings = tempValue ? tempValue.squadStandings + currentCategoryStanding : currentCategoryStanding

            squadStandingsMap.set(
                squad.squadName,
                {
                    squadName: squad.squadName,
                    squadID: squad.squadID,
                    squadStandings: newSquadStandings
                }
            )
        })
    })

    // convert to an array for sorting and display
    let squadStandingsArray: any = [];
    squadStandingsMap.forEach((value, key) => {
        squadStandingsArray.push(value);
    });

    squadStandingsArray.sort((a: SquadStandingsRank, b: SquadStandingsRank) => b.squadStandings - a.squadStandings);

    return squadStandingsArray as Array<SquadStandingsRank>
}

// Creates a map for ALL teams for ALL Squads with the squad name as the value and team as the key
export const createTeamsMap = (squads: Squad[]): Map<string, string> => {
    const teamMap: Map<string, string> = new Map();

    squads.forEach(squad => {
        squad.teamsList.forEach(team => teamMap.set(team, squad.name))
    })

    return teamMap;
}

function sort(a: { squadName: string, total: number, rank: number }, b: { squadName: string, total: number, rank: number }) {
    return b.total - a.total;
}