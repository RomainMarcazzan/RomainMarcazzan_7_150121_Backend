"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User, { foreignKey: "idUsers" });
      Like.belongsTo(models.Post, { foreignKey: "idPosts" });
    }
  }
  Like.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
    },
    {
      sequelize,
      tableName: "likes",
      modelName: "Like",
    }
  );
  return Like;
};
