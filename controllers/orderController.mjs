import { response } from 'express';

export default function initOrdersController(db) {
  const addOrder = async (request, response) => {
    try {
      // create order

      // console.log(request.body);
      // console.log(request.body.userId);
      const { userId } = request.body;
      const { newOrder } = request.body;
      console.log(newOrder);
      console.log(newOrder.length);
      console.log(newOrder[0].id);

      for (let i = 0; i < newOrder.length; i++) {
        // eslint-disable-next-line no-await-in-loop
        const createNewOrder = await db.Order.create({
          buyer_id: userId,
          product_id: Number(newOrder[i].id),
          quantity: Number(newOrder[i].quanity),
          created_at: new Date(),
          updated_at: new Date(),
        });

        // eslint-disable-next-line no-await-in-loop
        const createOrderUser = await db.OrderUser.create({
          order_id: createNewOrder.id,
          buyer_id: userId,
          merchant_id: newOrder[i].merchant_id,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }

      // await request.body.newOrder.forEach((order) => {

      // });

      // const newOrder = await db.Order.create({
      //   product_id: Number(request.body.userId),
      //   quantity:  ,
      // });

      // await request.body.newOrder.forEach((book) => {
      //   // console.log(book.id);
      //   db.BookOrder.create({
      //     book_id: book.id,
      //     order_id: newOrder.id,
      //     quantity: book.quanity,
      //     price: book.price,
      //   });
      // });
      response.send(200);
    } catch (error) {
      console.log(error);
    }
  };

  const getOrderByUserId = async (request, response) => {
    console.log(request.params.id);
    const userOrder = await db.Order.findAll({
      where: {
        buyer_id: request.params.id,
      },
      include: {
        model: db.Product,
      },
    });
    console.log(userOrder);
    response.send({ userOrder });
    // const userOrder = await db.Order.findAll({
    //   where: {
    //     buyer_id: request.params.id,
    //   },
    //   include: {
    //     model: db.Product,
    //   },
    // });
    // response.send({ userOrder });
  };

  const getOrderByMerchantId = async (request, response) => {
    console.log(request.params.id);
    const merchantOrder = await db.Product.findAll({
      where: {
        merchant_id: request.params.id,
      },
      include: {
        model: db.Order,
      },
    });
    console.log(merchantOrder);
    response.send({ merchantOrder });
  };

  return {
    addOrder,
    getOrderByUserId,
    getOrderByMerchantId,
  };
}
