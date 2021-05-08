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
      Comment.belongsTo(models.User, { foreignKey: "idUsers" });
      Comment.belongsTo(models.Post, { foreignKey: "idPosts" });
    }
  }
  Comment.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
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

// postId : {
//   type: Sequelize.INTEGER,
//   references: { model: 'posts', // name of Target model
//   key: 'id', // key in Target model that we're referencing
//   onUpdate: 'CASCADE',
//   onDelete: 'CASCADE',
// },
