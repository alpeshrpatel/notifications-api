module.exports = {
	env: "default",
	postgres: {
		"server": "3.135.62.9",
		"database": "notifications",
		"user": "",
		"password": "",
		"port": ""
	},
	mongodb: {
		"server": "3.135.62.9",
		"database": "notifications",
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