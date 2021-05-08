"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User, { foreignKey: "idUsers", as: "user" });
      Post.hasMany(models.Like, { foreignKey: "idPosts" });
      Post.hasMany(models.Comment, { foreignKey: "idPosts" });
    }

    toJSON() {
      return { ...this.get(), id: undefined, idUsers: undefined };
    }
  }
  Post.init(
    {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      imageUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      title: {
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
      tableName: "posts",
      modelName: "Post",
    }
  );
  return Post;
};
