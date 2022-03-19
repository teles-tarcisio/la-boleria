export default function mapOrdersQueryToObject(orderRow) {
  const [
    clientId, clientName, address, phone,
    cakeId, cakeName, price, description, image,
    createdAt, quantity, totalPrice,
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
    },
    createdAt,
    quantity,
    totalPrice,
  };
}
