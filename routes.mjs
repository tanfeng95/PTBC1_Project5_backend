import db from './models/index.mjs';

// import your controllers here
import initProductsController from './controllers/productController.mjs';
import initUserController from './controllers/userController.mjs';

export default function bindRoutes(app) {
  const productController = initProductsController(db);
  const userController = initUserController(db);

  app.get('/products', productController.FindAllProduct);
  app.get('/product/:id', productController.getProductById);
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
}
