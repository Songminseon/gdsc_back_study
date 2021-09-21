module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "Liked",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      like_category: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ref_id: {
        type: DataTypes.INTEGER,
      },
    },
    { timestamps: true, underscored: true }
  );
};
