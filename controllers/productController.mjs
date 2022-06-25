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

  return {
    FindAllProduct,
    getProductById,
  };
}
