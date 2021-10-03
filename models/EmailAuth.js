module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "EmailAuth",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      code: {
        type: DataTypes.STRING(10),
      },
      send_date: {
        type: DataTypes.DATE,
      },
      check_date: {
        type: DataTypes.DATE,
      },
      is_auth: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    { timestamps: true, underscored: true }
  );
};
