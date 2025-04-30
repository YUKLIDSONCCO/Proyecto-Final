const API_URL = 'http://localhost:3000/api/ventas';

export const createSale = async (sale) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sale),
  });
};
