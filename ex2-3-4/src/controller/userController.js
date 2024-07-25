const fs = require('fs');
const path = require('path');

// Load dummy data
let users;
try {
  users = JSON.parse(
    fs.readFileSync(path.join(__dirname, '..', 'data', 'users.json'), 'utf8')
  );
} catch (err) {
  console.error('Error reading users.json:', err);
  users = [];
}

// Get all users
exports.getAllUsers = (req, res) => {
  res.json(users);
};

// Get user by ID
exports.getUserById = (req, res) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) {
    res.json(user);
  } else {
    res.status(404).send('User not found');
  }
};

// Create new user
exports.createUser = (req, res) => {
  const newUser = {
    id: users.length + 1,
    ...req.body,
  };
  users.push(newUser);
  res.status(201).json(newUser);
};

// Update user by ID
exports.updateUserById = (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index !== -1) {
    users[index] = {
      ...users[index],
      ...req.body,
    };
    res.json(users[index]);
  } else {
    res.status(404).send('User not found');
  }
};

// Delete user by ID
exports.deleteUserById = (req, res) => {
  const index = users.findIndex((u) => u.id == req.params.id);
  if (index !== -1) {
    users.splice(index, 1);
    res.status(204).send();
  } else {
    res.status(404).send('User not found');
  }
};

// Pagination for users
exports.paginateUsers = (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  const paginatedUsers = users.slice(startIndex, endIndex);
  res.json(paginatedUsers);
};
