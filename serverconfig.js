var fs = require('fs');
var config = {};

// IMPORTANT: In order to be able to launch the musiqpad server, set this to true
config.setup = true;

/*
 Set this flag to false to disable web server hosting or true to enable web server hosting.
 This is useful if you want to host static files in another web server such as nginx.

 If you are only hosting the socket and want musiqpad to host the frontend set this to false.
*/
config.hostWebserver = true;

config.socketServer = {
	host: '0.0.0.0',     // Host name or IP that the socket server is located at. Leave blank to bind to process IP address
	port: '3076', // Leave blank to bind to process PORT
};

config.webServer = {
	address: '0.0.0.0', // Leave blank to bind to process IP address
	port: '3074' // Leave blank to bind to process PORT
};

config.useSSL = false;

config.certificate = {
//	key: fs.readFileSync('../cert.key'),
//	cert: fs.readFileSync('../cert.crt')
};

config.room = {
	name: 'FuechschenORG', // This is your pad name. It is shown as a user friendly description on the lounge and tab name.
	slug: 'fuechschenorg', // Slugs are used to identify your pad when connecting to musiqpad! This slug must be unique and all in lowecase.
	greet: 'Welcome to FuechschenORG.',
	maxCon: 0,
	ownerEmail: 'me@fuechschen.org', // This needs to be set, then the server restarted to take effect.
	guestCanSeeChat: true,
	bannedCanSeeChat: true,
	lastmsglimit: 6, // How many messages a user can see after joining.
	signupcd: 0, // How many miliseconds the user cannot do certain things after they sign up.
	allowemojis: true,
	allowrecovery: true,
	recaptcha: true,
	twitterenabled: false,
	tweetrandomness: 0.8,
	queue: {
		cycle: true,
		lock: false,
		limit: 50,
	},
	history: {
		limit_save: 10000,
		limit_send: 50,
	},
	email: {
		confirmation: true, // Whether to force user to confirm his email address before he is able to do anything
		sender: 'musiqpad@fuechschen.org',
		options: {
			auth: {
				xoauth: true
			}
		},
	},
	description: '\
				 <h1>FuechschenORG</h1>\
				 Testing? Testing!!\
				 \
				 <h2>Rules</h2>\
				 <p align="center">\
				 <ul>\
				 <li>1. Every genre is allowed to be played, however EDM is prefered.</li>\
				 <li>2. Every has to be Safe for Work.</li>\
				 <li>3. Be nice to each other. Nobody likes cunts or assholes.</li>\
				 <li>4. Since this is still in beta-stage, the pad may crash or restart at any time. Lost spots in the waitlist won\'t necesarily be restored</li>\
				 <li>5. Don\'t not ask for ranks, skips or moves. However, if you like to be swapped with another person, the person in the front can ask for a swap.</li>\
				 <li>6. Please use english in chat so everyone can understand you.</li>\
				 </ul>\
				 </p>\
				 ',
};

config.apis = {
	YT: {
		key: 'AIzaSyDxrJm1MJNr-ig3B8AN7ugOn12Xto7FMwM', // Required api key in order for YouTube search to work.
		restrictSearchToMusic: false,
	},
	SC: {
		key: '16e7da3e6d4700c7b4b6b65b4cc578fd',
	},
	reCaptcha: {
		key: '6LdzDxoTAAAAAHIcl3wwBsSUdwC3_VTrXx4Kv-yo',
		secret: '6LdzDxoTAAAAACT-8cpMlu2lvuLoa5Rs48dfDCGk',
	},
	musiqpad: {
		key: '05545608-28e7-d4ed-5716-aa0857655a2d', // This is required in order for your socket to update the musiqpad lounge. Request an API Key here: https://musiqpad.com/lounge
		sendLobbyStats: true,
	},
};

// The amount of time users stay logged in for before having to login again in days.
// 0 = login every time;
config.loginExpire = 7;

// Database config
config.db = {
	dbType: 		'mysql',   				// Values "level" for LevelDB and "mysql" for MySQL
	dbDir: 			'./socketserver/db',	// Only used for LevelDB. Directory to save databases.  Default is ./socketserver/db
	mysqlUser: 		'musiqpad',     				// Only used for MySQL.  Database username
	mysqlPassword: 	'2AK13e878efAKI23GuPi13qi6uz6J1', 					// Only used for MySQL.  Database password
	mysqlHost: 		'hoellenfuchs.fuechschen.org',  					// Only used for MySQL.  Host address
	mysqlDatabase: 	'musiqpad' 					// Only used for MySQL.  Database being used
};

/*
	'djqueue.join': Ability to join queue
	'djqueue.joinlocked': Ability to join locked queue
	'djqueue.leave': Ability to leave queue
	'djqueue.skip.self': Ability to skip self
	'djqueue.skip.other': Ability to skip others
	'djqueue.lock': Ability to lock/unlock queue
	'djqueue.limit': Ability to change waitlist limit
	'djqueue.cycle': Ability to enable/disable queue cycle
	'djqueue.move': Ability to move, swap, add and remove people in the queue
	'djqueue.playLiveVideos': Ability to play live videos with undefined duration
	'chat.send': Abilty to send chat messages
	'chat.delete': Ability to delete others' chat messages
	'chat.specialMention': Ability to use @everyone, @guest and @djs as mention
	'chat.broadcast': Ability to send a highlighted broadcast message
	'chat.private': Ability to send PMs
	'chat.staff': Ability to send and receive special staff chat
	'playlist.create': Ability to create playlists
	'playlist.delete': Ability to delete playlists
	'playlist.rename': Ability to rename playlists
	'playlist.import': Ability to import playlists
	'playlist.shuffle': Ability to shuffle playlists
	'room.grantroles': Ability to change user roles (requires canGrantPerms property)
	'room.banUser': Ability to ban and unban users
	'room.ratelimit.bypass': Will bypass ratelimit

	NOTE: Changing the PROPERTY NAME will break role assignments.  Title can be changed
	without breaking things, but property name must stay the same.
*/

// Defines the order that roles will appear on the user list
// PROPERTY names.  NOT title. (case-sensitive)
config.roleOrder = ['owner', 'coowner', 'dev', 'bot', 'supervisor', 'regular', 'default'];


// Defines which roles are 'staff' members
// PROPERTY names.  NOT title. (case-sensitive)
config.staffRoles = ['owner', 'coowner', 'supervisor', 'bot', 'resident'];


/*

Role Options:

rolename:{
	title: '',				// This is the title that gets displayed on the frontend.
	showtitle: true/false,	// This is whether or not to display the title on the frontend.
	badge: '',				// This can be any icon from the mdi package. A list of the icons is available here: https://materialdesignicons.com
	style: {},				// This can be used to set specific styles to the Username of a user with this role.
	permissions: [],		// A list of permissions a user with this role is allowed to use.
	canGrantRoles: [],		// A list of the roles that a user with this role can grant. I.e. an owner should be able to grant manager.
	mention: ''				// A custom mention. I.e. 'owner' would mention this group when someone typed @owner.
}

Below are a list of roles we suggest using.

*/

// Defines roles and permissions
config.roles = {
	owner: { // REQUIRED ROLE
		title: 'Host',
		showtitle: true,
		badge: 'chevron-double-up',
		style: {
			'color': '#F46B40'
		},
		permissions: [
			'pad.restart',
			'tweet.toggle',
			'tweet.send',
			'reload.force',
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.limit',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.broadcast',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
		],
		canGrantRoles: [
			'dev',
			'coowner',
			'supervisor',
			'bot',
			'regular',
			'resident',
			'default',
			'ncs_dev'
		],
	},
	dev: { // OPTIONAL ROLE - FOR MUSIQPAD DEVELOPERS
		title: 'Dev',
		showtitle: true,
		badge: 'source-pull',
		style: {
			'color': '#A77DC2'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.broadcast',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.banUser',
			'room.ratelimit.bypass',
		],
		canGrantRoles: [],
		mention: 'devs',
	},
	coowner: {
		title: 'Co-owner',
		showtitle: true,
		style: {
			'color': '#89BE6C'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.limit',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.delete',
			'chat.specialMention',
			'chat.broadcast',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
		],
		canGrantRoles: [
			'supervisor',
			'bot',
			'regular',
			'resident',
			'default',
		],
	},
	supervisor: {
		title: 'Staff',
		showtitle: true,
		badge: 'chevron-up',
		style: {
			'color': '#009CDD'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass',
		],
		canGrantRoles: [
			'regular',
			'default'
		],
	},
	resident: {
		title: 'RDj',
		showtitle: true,
		badge: 'music-note',
		style: {
			'color': 'purple'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'chat.send',
			'djqueue.skip.self',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'room.ratelimit.bypass'
		],
		canGrantRoles: [],
	},
	ncs_dev: {
		title: 'NCS-Dev',
		showtitle: true,
		badge: 'folder-account',
		style: {
			'color': '#81DAF5'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'chat.send',
			'djqueue.skip.self',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'room.ratelimit.bypass'
		],
		canGrantRoles: [],
	},
	bot: {
		title: 'Bot',
		showtitle: true,
		badge: 'android',
		style: {
			'color': 'red'
		},
		permissions: [
			'djqueue.join',
			'djqueue.joinlocked',
			'djqueue.leave',
			'djqueue.skip.self',
			'djqueue.skip.other',
			'djqueue.lock',
			'djqueue.cycle',
			'djqueue.limit',
			'djqueue.move',
			'djqueue.playLiveVideos',
			'chat.send',
			'chat.private',
			'chat.broadcast',
			'chat.delete',
			'chat.specialMention',
			'chat.staff',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import',
			'playlist.shuffle',
			'room.grantroles',
			'room.banUser',
			'room.ratelimit.bypass'
		],
		canGrantRoles: [
			'dev',
			'coowner',
			'supervisor',
			'resident',
			'ncs_dev',
			'regular',
			'default'
		],
	},
	default: { // REQUIRED ROLE
		title: 'Default',
		showtitle: false,
		style: {
			'color': '#ffffff'
		},
		permissions: [
			'djqueue.join',
			'djqueue.leave',
			'chat.send',
			'djqueue.skip.self',
			'playlist.create',
			'playlist.delete',
			'playlist.rename',
			'playlist.import'
		],
		canGrantRoles: [],
	}
};

module.exports = config;
