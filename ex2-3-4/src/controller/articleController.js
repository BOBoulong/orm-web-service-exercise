const fs = require('fs');
const path = require('path');

// Load dummy data
let articles;
try {
  articles = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'articles.json'), 'utf8')
  );
} catch (err) {
  console.error('Error reading articles.json:', err);
  articles = [];
}

// Get all articles
exports.getAllArticles = (req, res) => {
  res.json(articles);
};

// Get article by ID
exports.getArticleById = (req, res) => {
  const article = articles.find((a) => a.id == req.params.id);
  if (article) {
    res.json(article);
  } else {
    res.status(404).send('Article not found');
  }
};

// Create new article
exports.createArticle = (req, res) => {
  const newArticle = {
    id: articles.length + 1,
    ...req.body,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  articles.push(newArticle);
  res.status(201).json(newArticle);
};

// Update article by ID
exports.updateArticleById = (req, res) => {
  const index = articles.findIndex((a) => a.id == req.params.id);
  if (index !== -1) {
    articles[index] = {
      ...articles[index],
      ...req.body,
      updated_at: new Date().toISOString(),
    };
    res.json(articles[index]);
  } else {
    res.status(404).send('Article not found');
  }
};

// Delete article by ID
exports.deleteArticleById = (req, res) => {
  const index = articles.findIndex((a) => a.id == req.params.id);
  if (index !== -1) {
    articles.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Article not found');
  }
};

// Advanced search for articles
exports.searchArticles = (req, res) => {
  const { created_by, is_published, title, contents } = req.query;
  let filteredArticles = articles;

  if (created_by) {
    filteredArticles = filteredArticles.filter(
      (a) => a.created_by === created_by
    );
  }

  if (is_published) {
    filteredArticles = filteredArticles.filter(
      (a) => a.is_published.toString() === is_published
    );
  }

  if (title) {
    filteredArticles = filteredArticles.filter((a) => a.title.includes(title));
  }

  if (contents) {
    filteredArticles = filteredArticles.filter((a) =>
      a.contents.includes(contents)
    );
  }

  res.json(filteredArticles);
};

// Pagination for articles
exports.paginateArticles = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedArticles = articles.slice(startIndex, endIndex);
  res.json(paginatedArticles);
};
