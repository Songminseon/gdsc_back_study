module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Pinned",
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
