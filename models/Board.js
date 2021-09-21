module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Board",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      is_secret: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        default: false,
      },
      like_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaut: 0,
      },
    },
    { timestamps: true, underscored: true }
  );
};
