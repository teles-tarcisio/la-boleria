/* eslint-disable import/extensions */

import dbConnection from '../database/database.js';

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
