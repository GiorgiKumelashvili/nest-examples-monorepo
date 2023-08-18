export class LolOuterResponseDto {
    summoner = {
        name: '',
        level: 0,
        profileIconId: 0, // (mine) in link
        profileIconUrl: '',
        tier: '',
        tierIconUrl: '',
        rank: '',
        leaguePoints: 0,
        wins: 0,
        losses: 0,
        winratio: 0, // (mine)
    };

    matches = [
        {
            win: false,

            //   // summoner
            //   summonerLevel: 0,
            //   summonerName: '',

            // champion
            champLevel: 0,
            championId: 0,
            championName: '',
            championIconUrl: '',

            //   gameDuration: '',
            //   gameDate: '',

            // statistics
            kills: 0,
            deaths: 0,
            assists: 0,
            killParticipation: 0, // k/d
            cs: 0, // minions killed
            killTrophy: '', // (doubleKills, tripleKills, quadra kills, penta Kills)
            summoners: [], // { summonerName, championId }
        },
    ];
}
