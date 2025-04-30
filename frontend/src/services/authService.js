export const loginEmpleado = async (usuario, contrasena) => {
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario, contrasena }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.mensaje || 'Error en la autenticación');
    }
  
    const data = await response.json();
    return data;
  };
  