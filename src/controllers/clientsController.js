/* eslint-disable import/extensions */

import dbConnection from '../database/database.js';

import { mapClientOrdersToObject } from '../utils/ordersUtils.js';

export async function insertClient(req, res) {
  const { name, address, phone } = res.locals.newClientData;
  try {
    await dbConnection.query(`
      INSERT INTO clients (name, address, phone)
      VALUES ( $1, $2, $3);
      `, [name, address, phone]);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo cliente');
  }
}

export async function getClientOrders(req, res) {
  const clientId = parseInt(req?.params.id, 10);

  if (Number.isNaN(clientId)) {
    return res.sendStatus(400);
  }

  try {
    const clients = await dbConnection.query(
      `
      SELECT * FROM clients WHERE id = $1;
      `,
      [clientId],
    );
    if (clients.rows.length === 0) {
      return res.status(404).send('!erro! não existe cliente com id informado');
    }

    const { rows: clientOrders } = await dbConnection.query({
      text: `
        SELECT orders.id AS "orderId", orders.quantity,
          TO_CHAR(orders."createdAt", 'YYYY-MM-DD HH24:MI'),
          orders."totalPrice",
          cakes.name,
          flavours.name AS flavour
        FROM orders
          JOIN cakes ON cakes.id=orders."cakeId"
          JOIN clients ON clients.id=orders."clientId"
          JOIN flavours ON flavours.id=cakes."flavourId"
        WHERE clients.id = $1;
        `,
      values: [clientId],
      rowMode: 'array',
    });

    const formattedOrders = clientOrders.map(mapClientOrdersToObject);
    return res.status(200).send(formattedOrders);
  } catch (error) {
    return res.status(500).send('!erro! obtendo pedidos do cliente');
  }
}
