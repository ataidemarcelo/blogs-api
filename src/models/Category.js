module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Category', {
    id: { type: DataTypes.INTEGER, primaryKey: true},
    name: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
  });

  return User;
};
