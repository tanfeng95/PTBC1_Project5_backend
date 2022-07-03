import { response } from 'express';

export default function initProductsController(db) {
  const FindAllProduct = async (request, response) => {
    try {
      const Product = await db.Product.findAll();
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

  return {
    FindAllProduct,
    getProductById,
    getProductByMerchantId,
    deleteProductById,
  };
}
