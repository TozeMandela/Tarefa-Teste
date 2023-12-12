'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('photos', {
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
			article_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'articles',
					key: 'id'
				},
				onDelete: 'SET NULL',
				onUpdate: 'CASCADE'
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
	    await queryInterface.dropTable('photos');
	}
};
