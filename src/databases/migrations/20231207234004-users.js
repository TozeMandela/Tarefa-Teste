'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('users', {
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
			phone_number: {
				type: Sequelize.STRING(14),
				allowNull: true,
				unique: true,
			},
			phone_number_alternative: {
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
			number_identity: {
				type: Sequelize.STRING,
				allowNull: true,
				unique: true
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
	    await queryInterface.dropTable('users');
	}
};
