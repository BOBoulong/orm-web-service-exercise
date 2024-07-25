const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Import controllers
const articleController = require('./src/controller/articleController');
const userController = require('./src/controller/userController');

// Routes for articles
app.get('/articles', articleController.getAllArticles);
app.get('/articles/:id', articleController.getArticleById);
app.post('/articles', articleController.createArticle);
app.put('/articles/:id', articleController.updateArticleById);
app.delete('/articles/:id', articleController.deleteArticleById);
app.get('/articles/search', articleController.searchArticles);
app.get('/articles/paginate', articleController.paginateArticles);

// Routes for users
app.get('/users', userController.getAllUsers);
app.get('/users/:id', userController.getUserById);
app.post('/users', userController.createUser);
app.put('/users/:id', userController.updateUserById);
app.delete('/users/:id', userController.deleteUserById);
app.get('/users/paginate', userController.paginateUsers);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
