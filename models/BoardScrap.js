module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Board_scrap",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    { timestamps: true, underscored: true }
  );
};
