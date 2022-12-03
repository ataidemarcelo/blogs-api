module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
    {
      postId: { type: DataTypes.INTEGER, primaryKey: true },
      categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    },
    {
      timestamps: false,
      underscored: true,
      tableName: 'posts_categories'
    }
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    Category.belongsToMany(BlogPost, {
      as: 'blogPosts',
      through: PostCategory,
      foreignKey: 'categoryId',
      otherKey: 'postId',
    });
    BlogPost.belongsToMany(Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      otherKey: 'categoryId',
    });
  };

  return PostCategory;
};
