import { db } from '.';
import Sequelize,{ Model } from 'sequelize';

class Photos extends Model {
	id: number | undefined;
	originalname: string | undefined;
	filename: string | undefined;
	destination: string | undefined;
	mimetype: string | undefined;
	path: string | undefined;
	size: string | undefined;
	articleId: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
}

Photos.init({
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
	mimetype: {
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

export {Photos};