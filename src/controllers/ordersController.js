/* eslint-disable no-else-return */
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
  try {
    if (!targetDate) {
      const { rows: orders } = await dbConnection.query({
        text: `
        SELECT clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone,
        cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image,
        TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI'), orders.quantity, orders."totalPrice",
        flavours.name AS flavour
        FROM orders
          JOIN clients ON clients.id=orders."clientId"
          JOIN cakes ON cakes.id=orders."cakeId"
          JOIN flavours ON flavours.id=cakes."flavourId";
    `,
        rowMode: 'array',
      });

      if (orders.length === 0) {
        return res.status(404).send([]);
      }

      const formattedOrders = orders.map(mapOrdersQueryToObject);
      return res.status(200).send(formattedOrders);
    } else {
      const { rows: ordersByDate } = await dbConnection.query({
        text: `
      SELECT clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone,
      cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image,
      TO_CHAR(ord."createdAt", 'YYYY-MM-DD HH24:MI'), ord.quantity, ord."totalPrice",
      flavours.name AS flavour
      FROM orders ord
        JOIN clients ON clients.id=ord."clientId"
        JOIN cakes ON cakes.id=ord."cakeId"
        JOIN flavours ON flavours.id=cakes."flavourId"
      WHERE ord."createdAt"::text LIKE $1;
    `,
        values: [`${targetDate}%`],
        rowMode: 'array',
      });

      if (ordersByDate.length === 0) {
        return res.status(404).send([]);
      }

      const formattedOrders = ordersByDate.map(mapOrdersQueryToObject);
      return res.status(200).send(formattedOrders);
    }
  } catch (error) {
    return res.status(500).send('!erro! obtendo pedidos');
  }
}

export async function getOrderById(req, res) {
  const orderId = parseInt(req?.params.id, 10);

  if (Number.isNaN(orderId)) {
    return res.sendStatus(400);
  }

  try {
    const { rows: orders } = await dbConnection.query({
      text: `
        SELECT clients.id AS "clientId", clients.name AS "clientName", clients.address, clients.phone,
        cakes.id AS "cakeId", cakes.name AS "cakeName", cakes.price, cakes.description, cakes.image,
        TO_CHAR(ord."createdAt", 'YYYY-MM-DD HH24:MI'), ord.quantity, ord."totalPrice",
        flavours.name AS flavour
        FROM orders ord
          JOIN clients ON clients.id=ord."clientId"
          JOIN cakes ON cakes.id=ord."cakeId"
          JOIN flavours ON flavours.id=cakes."flavourId"
        WHERE ord.id = $1;
        `,
      values: [orderId],
      rowMode: 'array',
    });

    if (orders.length === 0) {
      return res.status(404).send([]);
    }

    const formattedOrders = orders.map(mapOrdersQueryToObject);
    return res.status(200).send(formattedOrders);
  } catch (error) {
    return res.status(500).send('!erro! obtendo pedidos');
  }
}
