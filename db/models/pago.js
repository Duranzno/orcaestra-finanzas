'use strict';
module.exports = (sequelize, DataTypes) => {
  var Pago = sequelize.define('Pago', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    banco: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    referencia: {
      type: DataTypes.STRING,
      defaultValue: "",
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    monto: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
  Pago.associate = function (models) {
    // associations can be defined here
    Pago.belongsTo(models.Estudiante, {
      foreignKey: "module._initPaths();d",
      onDelete: "Cascade",
    })
  };
  return Pago;
};
