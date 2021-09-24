interface RawGameInformation {
    "id": number,
    "season": number,
    "week": number,
    "seasonType": string,
    "startDate": string,
    "startTimeTbd": boolean,
    "neutralSite": boolean,
    "conferenceGame": boolean,
    "attendance": number,
    "venueId": number,
    "venue": string,
    "homeId": number,
    "homeTeam": string,
    "homeConference": string,
    "homePoints": number,
    "homeLineScores": Array<number>,
    "homePostWinProb": number,
    "awayId": number,
    "awayTeam": string,
    "awayConference": string,
    "awayPoints": number,
    "awayLineScores": Array<number>,
    "awayPostWinProb": number,
    "excitementIndex": number,
    "highlights": string,
    "notes": string
}

export interface GameInformation {
    "season": number,
    "week": number,
    "seasonType": string,
    "startDate": string,
    "conferenceGame": boolean,
    "homeTeam": string,
    "homePoints": number,
    "awayTeam": string,
    "awayPoints": number,
    "squad": string,
    "squad2"?: string
}


export const pruneGames = (gameInformation: Array<RawGameInformation>, squadsTeamsMap: Map<string, string>): Array<GameInformation> => {
    return gameInformation.filter(game => {
        if (squadsTeamsMap.has(game.awayTeam) || squadsTeamsMap.has(game.homeTeam)) {
            return true;
        } else {
            return false;
        }
    }).map(rawGame => {
        let squad = null;
        let squad2 = null;
        if (squadsTeamsMap.has(rawGame.homeTeam)) {
          squad = squadsTeamsMap.get(rawGame.homeTeam);
        }

        if (squadsTeamsMap.has(rawGame.awayTeam)) {
          // check if there is already and squad and its not the same one we have already
          // If its already there then we have that game already
          if (squad && squad !== squadsTeamsMap.get(rawGame.awayTeam)) {
            squad2 = squadsTeamsMap.get(rawGame.awayTeam);
          } else {
            squad = squadsTeamsMap.get(rawGame.awayTeam);
          }
        }



        return {
            "season": rawGame.season,
            "week": rawGame.week,
            "seasonType": rawGame.seasonType,
            "startDate": rawGame.startDate,
            "conferenceGame": rawGame.conferenceGame,
            "homeTeam": rawGame.homeTeam,
            "homePoints": rawGame.homePoints,
            "awayTeam": rawGame.awayTeam,
            "awayPoints": rawGame.awayPoints,
            "squad": squad as string,
            "squad2": squad2 as string
        }
    });
}

export const getGamesPerSquad = (games: GameInformation[], squad: string) => {
    return games.filter(game => game.squad === squad || game.squad2 === squad);
}

export const getGamesPerWeek = (games: GameInformation[], week: number) => {
    return games.filter(game => game.week === week);
}
