'use strict';
module.exports = (sequelize, DataTypes) => {
  var Estudiante = sequelize.define('Estudiante', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    numero: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {});
  Estudiante.associate = function (models) {
    // associations can be defined here
    Estudiante.hasMany(models.Pago, {
      foreignKey: "id",
      onDelete: 'CASCADE',
      as: "Pago"
    })
  };
  return Estudiante;
};
