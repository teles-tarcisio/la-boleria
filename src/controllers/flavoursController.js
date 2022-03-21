/* eslint-disable import/extensions */
/* eslint-disable import/prefer-default-export */

import dbConnection from '../database/database.js';

export async function insertFlavour(req, res) {
  const { name } = res.locals.newFlavourData;
  try {
    const { rows: foundFlavours } = await dbConnection.query(
      `
      SELECT * FROM flavours
      WHERE name ILIKE $1`,
      [name],
    );
    if (foundFlavours.length > 0) {
      return res.status(409).send('Já existe sabor cadastrado com este nome');
    }

    await dbConnection.query(`
      INSERT INTO flavours (name)
      VALUES ( $1);
      `, [name]);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo sabor');
  }
}
