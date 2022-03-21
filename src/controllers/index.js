/* eslint-disable import/extensions */

import { insertCake } from './cakesController.js';
import { insertClient, getClientOrders } from './clientsController.js';
import { insertOrder, getOrders, getOrderById } from './ordersController.js';

export {
  insertCake,
  insertClient,
  insertOrder,
  getOrders,
  getOrderById,
  getClientOrders,
};
