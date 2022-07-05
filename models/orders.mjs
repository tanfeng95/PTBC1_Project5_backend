export default function initOrderModel(sequelize, DataTypes) {
  return sequelize.define(
    'orders',
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      buyer_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'users',
          key: 'id',
        },
      },
      product_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'products',
          key: 'id',
        },
      },
      quantity: {
        type: DataTypes.INTEGER,
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
