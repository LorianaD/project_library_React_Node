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
      onDelete: "RESTRICT",
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('books', 'type_id');
  }
};
