'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'created_by',
        as: 'author',
      });
    }
  }
  Article.init(
    {
      title: DataTypes.STRING,
      contents: DataTypes.TEXT,
      created_by: DataTypes.INTEGER,
      is_published: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Article',
    }
  );
  return Article;
};
