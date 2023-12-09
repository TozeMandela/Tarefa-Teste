'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('articles', {
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
			is_promotion: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
			},
			price_orininal: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			price_promotional: {
				type: Sequelize.INTEGER,
				allowNull: false,
			},
			quantity_initial: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			quantity_buy: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				},
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
	    await queryInterface.dropTable('articles');
	}
};
