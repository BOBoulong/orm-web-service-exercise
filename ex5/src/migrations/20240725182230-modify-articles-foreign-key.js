'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Articles" 
      DROP CONSTRAINT "Articles_created_by_fkey",
      ADD CONSTRAINT "Articles_created_by_fkey"
      FOREIGN KEY ("created_by")
      REFERENCES "Users" (id)
      ON DELETE CASCADE
      ON UPDATE CASCADE
    `);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.sequelize.query(`
      ALTER TABLE "Articles" 
      DROP CONSTRAINT "Articles_created_by_fkey",
      ADD CONSTRAINT "Articles_created_by_fkey"
      FOREIGN KEY ("created_by")
      REFERENCES "Users" (id)
    `);
  },
};
