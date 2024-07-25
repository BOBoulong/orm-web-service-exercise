const { Article, User } = require('../models');
const { Op } = require('sequelize');

exports.getAllArticles = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const offset = (page - 1) * limit;

  try {
    const articles = await Article.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });
    res.json({
      articles: articles.rows,
      totalPages: Math.ceil(articles.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const article = await Article.create(req.body);
    res.status(201).json(article);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id, {
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });
    if (article) {
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      await article.update(req.body);
      res.json(article);
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByPk(req.params.id);
    if (article) {
      await article.destroy();
      res.json({ message: 'Article deleted' });
    } else {
      res.status(404).json({ message: 'Article not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.searchArticles = async (req, res) => {
  const {
    created_by,
    is_published,
    title,
    content,
    page = 1,
    limit = 10,
  } = req.query;
  const offset = (page - 1) * limit;

  const whereClause = {};
  if (created_by) whereClause.created_by = created_by;
  if (is_published !== undefined) whereClause.is_published = is_published;
  if (title) whereClause.title = { [Op.iLike]: `%${title}%` };
  if (content) whereClause.contents = { [Op.iLike]: `%${content}%` };

  try {
    const articles = await Article.findAndCountAll({
      where: whereClause,
      limit: parseInt(limit),
      offset: parseInt(offset),
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });
    res.json({
      articles: articles.rows,
      totalPages: Math.ceil(articles.count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
