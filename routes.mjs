import db from './models/index.mjs';

// import your controllers here
import initProductsController from './controllers/productController.mjs';

export default function bindRoutes(app) {
  const productController = initProductsController(db);

  app.get('/products', productController.index);

  // initialize the controller functions here
  // pass in the db for all callbacks
}
