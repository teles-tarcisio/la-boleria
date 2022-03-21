export function mapOrdersQueryToObject(orderRow) {
  const [
    clientId, clientName, address, phone,
    cakeId, cakeName, price, description, image,
    createdAt, quantity, totalPrice,
    flavour,
  ] = orderRow;

  return {
    client: {
      id: clientId,
      name: clientName,
      address,
      phone,
    },
    cake: {
      id: cakeId,
      name: cakeName,
      price,
      description,
      image,
      flavour,
    },
    createdAt,
    quantity,
    totalPrice,
  };
}

export function mapClientOrdersToObject(orderRow) {
  const [
    orderId, quantity, createdAt, totalPrice,
    name,
    flavour,
  ] = orderRow;

  return {
    orderId,
    quantity,
    createdAt,
    totalPrice,
    name,
    flavour,
  };
}
