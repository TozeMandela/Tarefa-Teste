import { db } from '.';
import Sequelize,{ Model } from 'sequelize';
import { Users } from './usersModel';

class Logins extends Model {
	id: number | undefined;
	username: string | undefined;
	password: string | undefined;
	passwordConfirm: string | undefined;
	userId: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
}

Logins.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING(25),
		allowNull: false,
		unique: true,
	},
	password: {
		type: Sequelize.STRING(25),
		allowNull: false,
	},
	passwordConfirm: {
		type: Sequelize.STRING(25),
		allowNull: false,
	},
	userId: {
		type: Sequelize.INTEGER,
		references: {
			model: 'users',
			key: 'id'
		},
		unique: true,
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	}
}, {
	sequelize: db,
	tableName: 'logins',
	underscored: true,
	timestamps: true
});

Logins.belongsTo(Users, {foreignKey: 'userId'});
Users.hasOne(Logins);
export {Logins};