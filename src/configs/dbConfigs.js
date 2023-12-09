// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
	dialect: 'mysql',
	host: process.env.DB_HOSTNAME,
	username: process.env.DB_USERNAME,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: process.env.DB_PORT,
	define: {
		timestamps: true,
		underscored: true,
		createdAt: 'created_at',
		updatedAt: 'updated_at',
	},
	dialectOptions: {
		timezone: 'Africa/Luanda',
	},
	timezone: 'Africa/Luanda',
};