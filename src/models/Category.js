module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    id: { 
      type: DataTypes.INTEGER, 
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
  }, {
    underscored: true,
    tableName: 'categories',
    timestamps: false,
  });

  return Category;
};
