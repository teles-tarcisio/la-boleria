/* eslint-disable import/prefer-default-export */
import dbConnection from "../database/database.js";

export async function insertCake(req, res) {
  const { name, price, description, image } = res.locals.newCakeData;
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

    await dbConnection.query(`
      INSERT INTO cakes (name, price, description, image)
      VALUES ( $1, $2, $3, $4);
      `, [name, price, description, image]);

    return res.sendStatus(201);
  } catch (error) {
    return res.status(500).send('!erro! cadastrando novo bolo');
  }
}
