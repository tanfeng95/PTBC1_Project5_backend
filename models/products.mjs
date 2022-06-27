export default function initProductModel(sequelize, DataTypes) {
  return sequelize.define(
    'products',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        type: DataTypes.TEXT('long'),
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
      },
      image: {
        type: DataTypes.STRING,
      },
      department: {
        type: DataTypes.STRING,
      },
      adjective: {
        type: DataTypes.STRING,
      },
      description: {
        type: DataTypes.STRING,
      },
      material: {
        type: DataTypes.STRING,
      },
      merchant_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      // The underscored option makes Sequelize reference snake_case names in the DB.
      underscored: true,
    },
  );
}
