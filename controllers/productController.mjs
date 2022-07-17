import { response } from 'express';
import pkg from 'sequelize';

const { Op } = pkg;

export default function initProductsController(db) {
  const FindAllProduct = async (request, response) => {
    try {
      console.log(request.query.search);
      let Product;
      if (request.query.search) {
        Product = await db.Product.findAll({
          where: {
            name: {
              [Op.like]: `%${request.query.search}%`,
            },
          },
        });
      } else {
        Product = await db.Product.findAll();
      }

      response.send({ Product });
    } catch (error) {
      console.log(error);
    }
  };

  const getProductById = async (request, response) => {
    try {
      const Product = await db.Product.findByPk(request.params.id);
      response.send(Product);
    } catch (error) {
      console.log(error);
    }
  };

  const getProductByMerchantId = async (request, response) => {
    try {
      const shopProduct = await db.Product.findAll({
        where: {
          merchant_id: request.params.id,
        },
      });
      response.send(shopProduct);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProductById = async (request, response) => {
    try {
      const shopProduct = await db.Product.findOne({
        where: {
          merchant_id: request.params.merchantId,
          id: request.params.productId,
        },
      });

      if (shopProduct) {
        await shopProduct.destroy();
      }

      response.send('Product deleted');
    } catch (error) {
      console.log(error);
    }
  };

  const addProduct = async (request, response) => {
    try {
      const product = {
        name: request.body.name,
        price: parseFloat(request.body.price),
        image: request.body.image,
        department: request.body.department,
        adjective: request.body.adjective,
        description: request.body.description,
        material: request.body.material,
        merchant_id: request.params.merchantId,
        created_at: new Date(),
        updated_at: new Date(),
      };
      console.log('adding the product', product);
      const shopProduct = await db.Product.create(product);

      response.send(shopProduct);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    FindAllProduct,
    getProductById,
    getProductByMerchantId,
    deleteProductById,
    addProduct,
  };
}
