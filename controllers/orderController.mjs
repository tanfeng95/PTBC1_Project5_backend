import { response } from 'express';

export default function initOrdersController(db) {
  const addOrder = async (request, response) => {
    try {
      // create order

      // console.log(request.body);
      // console.log(request.body.userId);
      const { newOrder } = request.body;
      console.log(newOrder);
      console.log(newOrder[0].id);

      request.body.newOrder.forEach((order) => {
        
      });

      // const createNewOrder = await db.Order.create({
      //   product_id: Number(newOrder[0].id),
      //   quantity: Number(newOrder[0].quanity),
      //   created_at: new Date(),
      //   updated_at: new Date(),
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

  return {
    addOrder,
  };
}
