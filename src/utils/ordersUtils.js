export default function mapOrdersQueryToObject(orderRow) {
  const [
    clientId, clientName, address, phone,
    cakeId, cakeName, description, image,
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
      description,
      image,
    },
    createdAt,
    quantity,
    totalPrice,
  };
}
