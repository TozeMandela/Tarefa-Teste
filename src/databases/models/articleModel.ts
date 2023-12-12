import { db } from '.';
import Sequelize,{ Model } from 'sequelize';

class Article extends Model {
	id: number | undefined;
	title: string | undefined;
	descrition: string | undefined;
	isPromotion: boolean | undefined;
	priceOrininal: number | undefined;
	pricePromotional: number | undefined;
	quantityInitial: string | undefined;
	quantityBuy: string | undefined;
	userId: number | undefined;
	created_at: Date | undefined;
	updated_at: Date | undefined;
}

Article.init({
	id: {
		type: Sequelize.INTEGER,
		unique: true,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	title: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	descrition: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	isPromotion: {
		type: Sequelize.BOOLEAN,
		allowNull: false,
	},
	priceOrininal: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	pricePromotional: {
		type: Sequelize.INTEGER,
		allowNull: false,
	},
	quantityInitial: {
		type: Sequelize.STRING,
		allowNull: false,
	},
	quantityBuy: {
		type: Sequelize.STRING,
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
	tableName: 'articles',
	underscored: true,
	timestamps: true
});

export {Article};