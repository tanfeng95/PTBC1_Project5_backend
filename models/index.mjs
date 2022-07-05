import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import initUserModel from './users.mjs';
import initProductModel from './products.mjs';
import initOrderModel from './orders.mjs';
import initOrderUserModel from './orderUser.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.User = initUserModel(sequelize, Sequelize.DataTypes);
db.Product = initProductModel(sequelize, Sequelize.DataTypes);
db.Order = initOrderModel(sequelize, Sequelize.DataTypes);
db.OrderUser = initOrderUserModel(sequelize, Sequelize.DataTypes);

// one merchant user can have many products
// db.Product.belongsTo(db.User, { foreignKey: { name: 'merchant_id', field: 'merchant_id' } });
db.Product.belongsTo(db.User, { foreignKey: 'merchant_id' });
db.User.hasMany(db.Product, { foreignKey: 'merchant_id' });
// db.Product.belongsTo(db.User);
// db.User.hasMany(db.Product);

// one product can have many orders
db.Order.belongsTo(db.Product);
db.Product.hasMany(db.Order);

// many to many order to users

db.User.belongsToMany(db.Order, { through: 'orders_users', foreignKey: 'buyer_id' });
db.User.belongsToMany(db.Order, { through: 'orders_users', foreignKey: 'merchant_id' });
db.Order.belongsToMany(db.User, { through: 'orders_users', foreignKey: 'order_id' });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
