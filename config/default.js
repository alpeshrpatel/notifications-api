module.exports = {
	env: "default",
	mongodb: {
		"server": "cluster0-qpk3s.mongodb.net",
		"database": "notifications",
		"username": "notifications",
		"password": "notifications2020!",
		"port": ""
	},
	postgres: {
		"server": process.env.IP,
		"database": "notifications",
		"username": "notifications",
		"password": "notifications2020!",
		"port": "27017"
	},
	userdb: {
		"server": process.env.IP,
		"database": "pr0jectA",
		"user": "",
		"password": "",
		"port": "27017"
	},
	aws: {
		"accessKeyId": process.env.AWS_ACCESS_KEY_ID,
		"secretAccessKey": process.env.AWS_SECRET_ACCESS_KEY
	},
	secret: 'veryverylovely'
};