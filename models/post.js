module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    // title, description, url, category, alt_category, votes
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    category: DataTypes.STRING,
    altCategory: DataTypes.STRING,
    votes: DataTypes.INTEGER
  });
  return Post;
};
