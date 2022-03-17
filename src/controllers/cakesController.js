/* eslint-disable import/prefer-default-export */
import dbConnection from "../database/database.js";

export async function insertCake(req, res) {
  const { name, price, description, image } = req.body;
  try {
    await dbConnection.query(`
    INSERT INTO cakes (name, price, description, image)
    VALUES ( $1, $2, $3, $4);
  `, [name, price, description, image]);
  } catch (error) {
    console.error(error);
    res.status(500).send('!erro! cadastrando novo bolo');
  }
}
