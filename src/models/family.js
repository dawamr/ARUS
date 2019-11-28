"use strict";
module.exports = (sequelize, DataTypes) => {
  const family = sequelize.define(
    "family",
    {
      name: DataTypes.STRING,
      nik: DataTypes.INTEGER,
      user_id: DataTypes.INTEGER,
      age: DataTypes.INTEGER,
      gender: DataTypes.ENUM("p", "l"),
      dateOfBirth: DataTypes.STRING,
      placeOfBirth: DataTypes.STRING
    },
    {
      paranoid: true
    }
  );
  family.associate = function(models) {
    // associations can be defined here
    family.belongsTo(models.user, {
      foreignKey: "user_id",
      as: "user"
    });
  };
  return family;
};
