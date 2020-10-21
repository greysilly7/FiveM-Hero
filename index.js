// Here we just get the token from the config
const { secrets } = require('./config.json');

// Stuff in core is like the heart of this bot
const { FIVEMHEROCLIENT } = require('./core/client');

// Here we make a new instance of our heart
const client = new FIVEMHEROCLIENT();

client.login(secrets.token);