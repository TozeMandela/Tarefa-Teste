import { db } from '.';
import Sequelize,{ Model } from 'sequelize';

class Login extends Model {
	id: number | undefined;
	password: string | undefined;
	passwordConfirm: string | undefined;
	userId: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
}

Login.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
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
		onUpdate: 'CASCADE',
		onDelete: 'CASCADE',
	}
}, {
	sequelize: db,
	tableName: 'logins',
	underscored: true,
	timestamps: true
});

export {Login};