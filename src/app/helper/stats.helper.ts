import Squad from '../models/squad.model';
import teamStat from "../models/stats.model";

const statsToKeep = new Map()
    statsToKeep.set('totalYards', true);
    statsToKeep.set('possessionTime', true);
    statsToKeep.set('interceptionYards', true);
    statsToKeep.set('sacks', true);
    statsToKeep.set('fumblesRecovered', true);
    statsToKeep.set('netPassingYards', true);
    statsToKeep.set('rushingYards', true);
    statsToKeep.set('fourthDownConversions', true);
    statsToKeep.set('rushingTDs', true);
    statsToKeep.set('passingTDs', true);

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
    interface SquadObject extends Squad {
        teamMap: Map<any, any>;
        categoryMap: Map<any, any>;
        categoryTotals: {string: number}
    }

    let squadObject: any = {};
    
    squads.forEach(squad => {
        // Create out object
        const squadName = squad.name;
        squadObject = {...squadObject, [squadName]: { ...squad, 'categoryMap': new Map(), categoryTotals: []}}
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
        squadObject[key].categoryMap.forEach((value:Array<teamStat>, categoryKey:string) => {
            // Now go through each category
            const reducer = (accumulator: number, currentValue: teamStat) => accumulator + currentValue.statValue;
            const categoryTotal = value.reduce(reducer, 0)

            squadObject[key].categoryTotals = [...squadObject[key].categoryTotals, {categoryName: categoryKey, total: categoryTotal}];
        });
    })

    // TODO return less data and as an object
    return squadObject as SquadObject;
}

// Creates a map for ALL teams for ALL Squads with the squad name as the value and team as the key
const createTeamsMap = (squads: Squad[]): Map<string, string> => {
    const teamMap: Map<string, string> = new Map();

    squads.forEach(squad => {
        squad.teamsList.forEach(team => teamMap.set(team, squad.name))
    })

    return teamMap;
}

// Creates a map for a s
const createSquadTeamsMap = (squad: Squad): Map<string, string> => {
    const teamMap: Map<string, string> = new Map();

    squad.teamsList.forEach(team => teamMap.set(team, team))

    return teamMap;
}



export const rankSquadsPerCategory = (detailedSquads: Array<{name: string, categoryTotals: Array<{categoryName: string, total: number}>}>) => {
// create a map for the categories
const categoryMap = new Map();

// go through each squad
detailedSquads.forEach(squad => {
    squad.categoryTotals.forEach(categoryTotal => {
        // add the totals to the map with the key as the category name (without losing the previous values)
        const tempData = categoryMap.has(categoryTotal.categoryName) ? categoryMap.get(categoryTotal.categoryName) : [];
        categoryMap.set(categoryTotal.categoryName, [...tempData, {'squadName': squad.name, 'total': categoryTotal.total, 'rank': 0}]);
    })
});

// TODO I am doing this just to make it an array. i need to figure out how to iterate over an object better.
let categoryObject: any = [];
categoryMap.forEach((value: Array<{squadName: string, total: number, rank: number}>, key) => {
    const sorted = value.sort(sort);

    let rank = 1;
    sorted.forEach(category => {
        category.rank = rank;
        rank++;
    });

    categoryObject.push({categoryName: key, squads: sorted});
    categoryMap.set(key, sorted);
})

return categoryObject;
}

function sort(a: {squadName: string, total: number, rank: number}, b: {squadName: string, total: number, rank: number}) {
     return b.total - a.total;
  }