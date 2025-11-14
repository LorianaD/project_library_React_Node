'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('books', "type_id", {
      type: Sequelize.INTEGER,
      allowNull: true,
      reference: {
        model: "type",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('books', 'type_id');
  }
};
