module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Board_category",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      category_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    { timestamps: true, underscored: true }
  );
};
