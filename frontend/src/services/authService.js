const API_URL = 'http://localhost:3000'; // Cambia si tu backend usa otro puerto

export async function loginEmpleado(usuario, contrasena) {
  const response = await fetch(`${API_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ usuario, contrasena }),
  });

  if (!response.ok) {
    throw new Error('Error en login');
  }

  const data = await response.json();
  return data;
}
