// Made by: Greysilly7

const fetch = require('node-fetch');
const https = require('https');
const apiKEY = 'W3W9VQJQ2GDG3MKB6BXF'
const comunityID = '0F027EF40A7C1A671DAE8CD711AC835A'
require('util').promisify(fetch);


// https://dev.fivempanel.com/api/v2/external/user?key=${apiKEY}&com=${comunityID}${flag}

module.exports.getUser = async (userID) => {
    const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=W3W9VQJQ2GDG3MKB6BXF&com=0F027EF40A7C1A671DAE8CD711AC835A&id=discord:${userID}`);
    let json = await userInfo.json();
    return json.data;
    // if(typeof(userInfo) === null) return 0
    // return userInfo;
}


(async () => {
    let userID = '688238554769653771'
    require('util').promisify(fetch)
    const userInfo = await fetch(`https://dev.fivempanel.com/api/v2/external/user?key=W3W9VQJQ2GDG3MKB6BXF&com=0F027EF40A7C1A671DAE8CD711AC835A&id=discord:${userID}`);
    let json = await userInfo.json()
    console.log(json.data.user);
    console.log("test")
})();
