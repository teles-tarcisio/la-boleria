/* eslint-disable import/prefer-default-export */
import dbConnection from "../database/database.js";

export async function insertCake(req, res) {
  console.log('-->> res.locals: ', res.locals);

  // const { name, price, description, image } = req.body;
  /*
  try {
    const foundCakes = await dbConnection.query(`
      SELECT * FROM cakes
      WHERE unaccent(name) ILIKE $1`, [name]);
    if (foundCakes.rows.length > 0) {
      return res.status(409).send('Já existe bolo cadastrado com este nome');
    }
    await dbConnection.query(`
    INSERT INTO cakes (name, price, description, image)
    VALUES ( $1, $2, $3, $4);
  `, [name, price, description, image]);
  } catch (error) {
    console.error(error);
    return res.status(500).send('!erro! cadastrando novo bolo');
  }
  */
}
