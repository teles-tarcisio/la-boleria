/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import dbConnection from '../database/database.js';

export async function insertCake(req, res) {
  const { name, price, description, image, flavourId } = res.locals.newCakeData;
  try {
    const { rows: foundCakes } = await dbConnection.query(
      `
      SELECT * FROM cakes
      WHERE name ILIKE $1`,
      [name],
    );
    if (foundCakes.length > 0) {
      return res.status(409).send('Já existe bolo cadastrado com este nome');
    }

    const { rows: foundFlavours } = await dbConnection.query(
      `
      SELECT * FROM flavours
      WHERE id = $1`,
      [flavourId],
    );
    if (foundFlavours.length === 0) {
      return res.status(404).send('Não existe sabor de bolo com este id');
    }

    await dbConnection.query(`
      INSERT INTO cakes (name, price, description, image, "flavourId")
      VALUES ( $1, $2, $3, $4, $5);
      `, [name, price, description, image, flavourId]);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo bolo');
  }
}
