export function mapOrdersQueryToObject(orderRow) {
  const [
    clientId, clientName, address, phone,
    cakeId, cakeName, price, description, image,
    createdAt, quantity, totalPrice,
    flavour,
    isDelivered,
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
    isDelivered,
  };
}

export function mapClientOrdersToObject(orderRow) {
  const [
    orderId, quantity, createdAt, totalPrice,
    name,
    flavour,
    isDelivered,
  ] = orderRow;

  return {
    orderId,
    quantity,
    createdAt,
    totalPrice,
    name,
    flavour,
    isDelivered,
  };
}
