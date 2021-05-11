"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User, { foreignKey: "userId" });
      Comment.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Comment.init(
    {
      // uuid: {
      //   type: DataTypes.UUID,
      //   defaultValue: DataTypes.UUIDV4,
      // },
      comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isFlaged: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "comments",
      modelName: "Comment",
    }
  );
  return Comment;
};
