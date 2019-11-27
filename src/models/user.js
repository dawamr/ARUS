"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      nik: DataTypes.INTEGER
    },
    {
      paranoid: true
    }
  );
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.family, { as: "family" });
  };
  return user;
};
