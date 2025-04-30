const API_URL = 'http://localhost:3000/api/productos';

export const getProducts = async () => {
  const response = await fetch(API_URL);
  return await response.json();
};

export const createProduct = async (product) => {
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(product),
  });
};

export const deleteProduct = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
};
