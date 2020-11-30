// ditched normal http swithcing to express
const url = require('url');
const path = require('path');
const express = require('express');
const passport = require('passport');
const session = require('express-session');
const Strategy = require('passport-discord').Strategy;
const { panel, settings } = require('../config.json');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const { Permissions } = require('discord.js');

// Initialize express
const app = express();
const Memorystore = require('memorystore')(session);

// Export the dashboard as a function so we can start it when the bot comes online
module.exports = async (client) => {
	// Just declaring some paths
	const dataDir = path.resolve(`${process.cwd()}${path.sep}experimental_crap`);
	const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

	//(de)serilzation crap
	passport.serializeUser((user, done) => done(null, user));
	passport.deserializeUser((obj, done) => done(null, obj));

	// Set the scopes and pass it some useful info such as oru secret id and client id and callback url
	passport.use(new Strategy({
		clientID: panel.clientID,
		clientSecret: panel.clientSecret,
		callbackURL: `${panel.domain}:11500/callback`,
		scope: ['identify', 'guilds']
	}, (accessToken, refreshToken, profile, done) => {
		// Once reached login pass in profile with no logic added
		process.nextTick(() => done(null, profile))
	}));

	// We initialize the memorystore middleware with our express app.
	app.use(session({
		store: new Memorystore({ checkPeriod: 86400000  }),
		secret: '#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n',
		resave: false,
		saveUninitialized: false,
	}));

	// Initilize passport middleware
	app.use(passport.initialize());
	app.use(passport.session(undefined));

	// Bind to domain
	app.locals.domain = panel.domain.split('//')[1];

	// Setup templating engine
	app.engine('html', ejs.renderFile);
	app.set('view engine', 'html');

	// Initalize body parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	//declare a rendertemplate function to make the rendering of a template in a route as easy as possible
	const renderTemplate = (res, req, template, data = {}) => {
		// default base data which passed to the ejs template by default
		const baseData = {
			bot: client,
			path: req.path,
			user: req.isAuthenticated() ? req.user : null
		};

		// Render the template using absolute path of the template and the merged default data with rhe aditinoal data provided
		res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
	};

	// Now we declare checkAuth function middle ware to check if an user ris logged in or not, and if not redirect them
	const checkAuth = (req, res, next) => {
		// IF authenticated foward there request further into the route
		if(req.isAuthenticated()) return next();
	    // If not authenticated, we set the url the user is redirected to into the memory.
		req.session.backURL = req.url;
		// We redirect user to login endpoint/route.
		res.redirect("/login");
	}

	// This is the endpoint for when you login
	app.get('/login', (req, res, next) => {
		// Determine the returning url
		if(req.session.backURL) {
			req.session.backURL = req.session.backURL;
		} else if(req.headers.referer) {
			const parsed = url.parse(req.headers.referer);
			if (parsed.hostname === app.locals.domain) {
				req.session.backURL = parsed.path;
			}
		} else {
			req.session.backURL = '/';
		}
		next();
	},
	passport.authenticate('discord'));

	// This is the callback endpoint
	app.get('/callback', passport.authenticate('discord', {failureRedirect: '/'}), (req, res) => {
		if(req.session.backURL) {
			const url = req.session.backURL;
			req.session.backURL = null;
			res.redirect(url);
		} else {
			res.redirect('/')
		}
	});

	// Logout Endpoint
	app.get("/logout", (req, res) => {
		// We destroy the session.
		req.session.destroy(() => {
		  	// We logout the user.
		  	req.logout();
		  	// We redirect user to index.
		  	res.redirect("/");
		});
	});

	// Index endpoint.
	app.get("/", (req, res) => {
		renderTemplate(res, req, "index.ejs");
	});
	
	// Dashboard endpoint.
	app.get("/dashboard", checkAuth, (req, res) => {
		renderTemplate(res, req, "dashboard.ejs", { perms: Permissions });
	});

	/*
	// Settings endpoint.
	app.get("/dashboard/:guildID", checkAuth, async (req, res) => {
		// We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
		const guild = client.guilds.cache.get(req.params.guildID);
		if (!guild) return res.redirect("/dashboard");
		const member = guild.members.cache.get(req.user.id);
		if (!member) return res.redirect("/dashboard");
		if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");
	  
		renderTemplate(res, req, "settings.ejs", { guild, settings: settings, alert: null });
	});

	// Settings endpoint.
    app.post("/dashboard/:guildID", checkAuth, async (req, res) => {
        // We validate the request, check if guild exists, member is in guild and if member has minimum permissions, if not, we redirect it back.
        const guild = client.guilds.cache.get(req.params.guildID);
        if (!guild) return res.redirect("/dashboard");
        const member = guild.members.cache.get(req.user.id);
        if (!member) return res.redirect("/dashboard");
        if (!member.permissions.has("MANAGE_GUILD")) return res.redirect("/dashboard");
        // We retrive the settings stored for this guild.
      
        // We set the prefix of the server settings to the one that was sent in request from the form.
        settings.prefix = req.body.prefix;
        // We render the template with an alert text which confirms that settings have been saved.
        renderTemplate(res, req, "settings.ejs", { guild, settings: settings, alert: "Your settings have been saved." });
	});
	*/
	app.listen(panel.port, null, null, () => console.log(`Dashboard is up and running on port ${panel.port}`));
}