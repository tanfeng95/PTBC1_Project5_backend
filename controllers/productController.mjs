export default function initProductsController(db) {
  const index = async (request, response) => {
    try {
      //const Product = await db.Product.findAll({ include: ['user'] });
      const Product = await db.Product.findAll();
      response.send({ Product });
    } catch (error) {
      console.log(error);
    }
  };

  return {
    index,
  };
}
