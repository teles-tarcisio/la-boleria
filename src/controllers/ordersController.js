/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import dbConnection from '../database/database.js';

import { mapOrdersQueryToObject } from '../utils/index.js';

export async function insertOrder(req, res) {
  const { clientId, cakeId, quantity, totalPrice } = res.locals.newOrderData;
  try {
    const { rows: foundClients } = await dbConnection.query(
      `
      SELECT * FROM clients
      WHERE id = $1`,
      [clientId],
    );
    if (foundClients.length === 0) {
      return res.status(404).send('Não existe cliente com id informado');
    }

    const { rows: foundCakes } = await dbConnection.query(
      `
      SELECT * FROM cakes
      WHERE id = $1`,
      [cakeId],
    );
    if (foundCakes.length === 0) {
      return res.status(404).send('Não existe bolo com id informado');
    }

    await dbConnection.query(
      `
      INSERT INTO orders
      ("clientId", "cakeId", quantity, "createdAt", "totalPrice")
      VALUES ($1, $2, $3, LOCALTIMESTAMP(0), $4)`,
      [clientId, cakeId, quantity, totalPrice],
    );
    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo pedido');
  }
}

export async function getOrders(req, res) {
  const targetDate = req?.query.date;

  /*
  const { rows: allOrders } = await dbConnection.query('SELECT * FROM orders;');
  console.log(allOrders);
  */

  if (!targetDate) {
    const { rows: ordersQuery } = await dbConnection.query({
      text: `
        SELECT cli.id AS "clientId", cli.name AS "clientName", cli.address, cli.phone,
        ck.id AS "cakeId", ck.name AS "cakeName", ck.description, ck.image,
        ord."createdAt", ord.quantity, ord."totalPrice"
        FROM orders ord
          JOIN clients cli ON cli.id=ord."clientId"
          JOIN cakes ck ON ck.id=ord."cakeId";
    `,
      rowMode: 'array',
    });

    const formattedOrders = ordersQuery.map(mapOrdersQueryToObject);

    return res.status(501).send(formattedOrders);
  }

  return res.sendStatus(501);
}
