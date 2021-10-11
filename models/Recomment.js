module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Recomment",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      is_secret: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      like_num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
    },
    { timestamps: true, underscored: true }
  );
};
