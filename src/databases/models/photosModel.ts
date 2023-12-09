import { db } from '.';
import Sequelize,{ Model } from 'sequelize';

class Photo extends Model {
	id: number | undefined;
	originalname: string | undefined;
	filename: string | undefined;
	destination: string | undefined;
	path: string | undefined;
	size: string | undefined;
	articleId: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
}

Photo.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	originalname: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	filename: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	destination: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	path: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	size: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	articleId: {
		type: Sequelize.INTEGER,
		references: {
			model: 'articles',
			key: 'id'
		},
		onDelete: 'SET NULL',
		onUpdate: 'CASCADE'
	}
}, {
	sequelize: db,
	tableName: 'photos',
	underscored: true,
	timestamps: true
});

export {Photo};