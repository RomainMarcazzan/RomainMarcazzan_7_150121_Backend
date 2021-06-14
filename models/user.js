"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(
        models.Post,
        { foreignKey: "userId" },
        { onDelete: "CASCADE" }
      );
      User.hasMany(
        models.Like,
        { foreignKey: "userId" },
        { onDelete: "CASCADE" }
      );
      User.hasMany(
        models.Comment,
        { foreignKey: "userId" },
        { onDelete: "CASCADE" }
      );
      User.hasMany(
        models.Report,
        { foreignKey: "userId" },
        { onDelete: "CASCADE" }
      );
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have an email" },
          notEmpty: { msg: "User must have an email" },
          isEmail: { msg: "Must be a valid email address" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a firstname" },
          notEmpty: { msg: "User must have a firstname" },
        },
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a lastname" },
          notEmpty: { msg: "User must have a lastname" },
        },
      },
      isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
