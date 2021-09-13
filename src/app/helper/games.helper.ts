interface RawGameInformation {
    "id": number,
    "season": number,
    "week": number,
    "season_type": string,
    "start_date": string,
    "start_time_tbd": boolean,
    "neutral_site": boolean,
    "conference_game": boolean,
    "attendance": number,
    "venue_id": number,
    "venue": string,
    "home_id": number,
    "home_team": string,
    "home_conference": string,
    "home_points": number,
    "home_line_scores": Array<number>,
    "home_post_win_prob": number,
    "away_id": number,
    "away_team": string,
    "away_conference": string,
    "away_points": number,
    "away_line_scores": Array<number>,
    "away_post_win_prob": number,
    "excitement_index": number,
    "highlights": string,
    "notes": string
}

interface GameInformation {
    "season": number,
    "week": number,
    "season_type": string,
    "start_date": string,
    "conference_game": boolean,
    "home_team": string,
    "home_points": number,
    "away_team": string,
    "away_points": number,
}


const pruneGames = (gameInformation: Array<RawGameInformation>, squadsMap: Map<string, string>): Array<GameInformation> => {
    return gameInformation.filter(game => {
        if (squadsMap.has(game.away_team) || squadsMap.has(game.home_team)) {
            return {
                "season": game.season,
                "week": game.week,
                "season_type": game.season_type,
                "start_date": game.start_date,
                "conference_game": game.conference_game,
                "home_team": game.home_team,
                "home_points": game.home_points,
                "away_team": game.away_team,
                "away_points": game.away_points,

            }
        } else {
            return false;
        }
    })
}