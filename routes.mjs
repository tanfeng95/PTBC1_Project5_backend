import db from './models/index.mjs';

// import your controllers here
import initProductsController from './controllers/productController.mjs';

export default function bindRoutes(app) {
  const productController = initProductsController(db);

  app.get('/products', productController.FindAllProduct);
  app.get('/product/:id', productController.getProductById);

  // initialize the controller functions here
  // pass in the db for all callbacks
}
