'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Pagos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      banco: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
      },
      referencia: {
        type: Sequelize.STRING,
        defaultValue: "",
        allowNull: false,
      },
      fecha: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: false,
      },
      monto: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      estudianteId: {
        type: Sequelize.INTEGER,
        onDelete: "CASCADE",
        references: {
          model: 'Estudiantes',
          key: "id"
        }

      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Pagos');
  }
};
