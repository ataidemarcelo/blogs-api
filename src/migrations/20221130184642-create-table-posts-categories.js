'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('posts_categories', {
      postId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'post_id',
        primaryKey: true,
        references: {
          model: 'blog_posts',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
      categoryId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        field: 'category_id',
        primaryKey: true,
        references: {
          model: 'categories',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      },
    });
  },

  async down (queryInterface, _Sequelize) {
    await queryInterface.dropTable('posts_categories');
  }
};
