"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Report extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Report.belongsTo(models.User, { foreignKey: "userId" });
      Report.belongsTo(models.Post, { foreignKey: "postId" });
    }
  }
  Report.init(
    {},
    {
      sequelize,
      tableName: "reports",
      modelName: "Report",
    }
  );
  return Report;
};
