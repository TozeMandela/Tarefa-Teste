import { db } from '.';
import Sequelize,{ Model } from 'sequelize';

class Users extends Model {
	id: number | undefined;
	name: string | undefined;
	gender: string | undefined;
	email: string | undefined;
	phoneNumber: string | undefined;
	phoneNumberAlternative: string | undefined;
	location: string | undefined;
	nationality: string | undefined;
	numberIdentity: string | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
}

Users.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	name: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	gender: {
		type: Sequelize.ENUM('F', 'M'),
		allowNull: false,
	},
	email: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	phoneNumber: {
		type: Sequelize.STRING(14),
		allowNull: true,
		unique: true,
	},
	phoneNumberAlternative: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	location: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	nationality: {
		type: Sequelize.STRING,
		allowNull: true,
	},
	numberIdentity: {
		type: Sequelize.STRING,
		allowNull: true,
		unique: true
	}
}, {
	sequelize: db,
	tableName: 'users',
	underscored: true,
	timestamps: true
});

export {Users};