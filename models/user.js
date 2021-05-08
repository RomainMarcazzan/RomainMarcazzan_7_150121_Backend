"use strict";
const { Model } = require("sequelize");
const comment = require("./comment");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Post, { foreignKey: "idUsers", as: "posts" });
      User.hasMany(models.Like, { foreignKey: "idUsers" });
      User.hasMany(models.Comment, { foreignKey: "idUsers" });
    }

    toJSON() {
      return { ...this.get(), id: undefined };
    }
  }
  User.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: "User must have a firstname" },
          notEmpty: { msg: "User must have a firstname" },
        },
      },
      lastName: {
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
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
