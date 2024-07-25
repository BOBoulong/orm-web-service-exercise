'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const articles = [];
    for (let i = 1; i <= 10; i++) {
      for (let j = 1; j <= 2; j++) {
        articles.push({
          title: `Article ${(i - 1) * 2 + j} by User ${i}`,
          contents: `This is the content of article ${
            (i - 1) * 2 + j
          } written by user ${i}. It contains some sample text.`,
          created_by: i,
          is_published: Math.random() < 0.7, // 70% chance of being published
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    }
    await queryInterface.bulkInsert('Articles', articles, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Articles', null, {});
  },
};
