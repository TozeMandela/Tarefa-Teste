import { Options } from 'sequelize';

const config: Options =  {
	username: process.env.DB_USERNAME!,
	password: process.env.DB_PASSWORD!,
	database: process.env.DB_NAME!,
	host: process.env.DB_HOSTNAME!,
	port: 3306,
	dialect: 'mysql',
	dialectOptions: {
		charset: 'utf8'
	},
	protocol: 'tcp',
	native: false,
	ssl: false,
	replication: false
};

export {config};