import multer from 'multer';
import db from './models/index.mjs';

// import your controllers here
import initProductsController from './controllers/productController.mjs';
import initUserController from './controllers/userController.mjs';
import initOrdersController from './controllers/orderController.mjs';

export default function bindRoutes(app) {
  const productController = initProductsController(db);
  const userController = initUserController(db);
  const orderController = initOrdersController(db);

  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'public/images');
    },
    filename: (req, file, cb) => {
      cb(null, `${file.fieldname}-${Date.now()}`);
    },
  });

  const multerUpload = multer({
    storage,
  });

  app.get('/products', productController.FindAllProduct);
  app.get('/product/:id', productController.getProductById);
  app.post('/login', userController.login);
  app.post('/signup', userController.signup);
  app.get('/user/:id', userController.getUserById);
  app.post('/createOrder', orderController.addOrder);
  app.get('/order/:id', orderController.getOrderByUserId);

  app.get('/merchant/product/:id', productController.getProductByMerchantId);
  app.get('/merchant/dashboard/:id', orderController.getOrderByMerchantId);
  app.get('/merchant/:id', productController.getProductByMerchantId);
  app.put('/merchant/product/delete/:merchantId/:productId', productController.deleteProductById);
  app.post('/merchant/product/add/:merchantId', multerUpload.single('image'), productController.addProduct);
  app.get('/merchant/product/edit/:merchantId/:productId', productController.getProductByMerchantIdByProductId);
  app.put('/merchant/product/edit/:merchantId/:productId', multerUpload.single('image'), productController.editProduct);
}
