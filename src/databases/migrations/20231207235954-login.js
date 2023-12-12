'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
	async up (queryInterface, Sequelize) {
		await queryInterface.createTable('logins', {
			id: {
				type: Sequelize.INTEGER,
				unique: true,
				autoIncrement: true,
				allowNull: false,
				primaryKey: true
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false,
				unique: true,
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			password_confirm: {
				type: Sequelize.STRING,
				allowNull: false,
			},
			user_id: {
				type: Sequelize.INTEGER,
				references: {
					model: 'users',
					key: 'id'
				},
				unique: true,
				onUpdate: 'CASCADE',
				onDelete: 'CASCADE',
			},
			created_at: Sequelize.DATE,
			updated_at: Sequelize.DATE
		});
	},

	async down (queryInterface) {
	    await queryInterface.dropTable('logins');
	}
};
