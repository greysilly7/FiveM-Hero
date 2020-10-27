// Made by: Greysilly7

const rest_client = require('node-rest-client');
const rest = new rest_client();
module.exports = class FiveMPanelAPI {
    constructor(apiKEY, comunityID) {
        this.apiKEY = apiKEY
        this.comunityID = comunityID
    }

    getTS = (userID) => {
        // https://dev.fivempanel.com/api/v2/external/user?key=${this.apiKEY}&com={this.comunityID}=discord:${userID}
        rest.get(`https://dev.fivempanel.com/api/v2/external/user?key=${this.apiKEY}&com={this.comunityID}=discord:${userID}`, (data, response) => {
            /*
            baseScore = 75
            pontsPerHour = 1
            commends = 0
            warns/kicks/bans = x
            let warnings_bans_kicks;
            let playTime = Math.round(Math.floor(data.playtime) % 60);
            if(typeof(data) === null) {
                warnings_bans_kicks = 1
            } else {
                warnings_bans_kicks = Math.round(userdata.warns.length + userdata.kicks.length + userdata.bans.length)
            }
            let TS = Math.round(75+playTime+data.commends.length-warnings_bans_kicks)
            return TS;
            */
           return data.user.trustscore;
        });
    }
}
