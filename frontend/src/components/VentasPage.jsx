import { useEffect, useState } from "react";
import axios from "axios";
import SaleForm from "./SaleForm";

function VentasPage() {
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const cargarMedicamentos = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/medicamentos");
        setMedicamentos(response.data);
      } catch (error) {
        console.error("Error al cargar los medicamentos:", error);
      }
    };

    cargarMedicamentos();
  }, []);

  return (
    <div className="container mt-4">
<<<<<<< HEAD
      <h2 className="mb-4"> Nueva Venta</h2>
=======
      <h2 className="mb-4">📦 Nueva Venta</h2>
>>>>>>> 59b922f247766e267bd0b36ed15c08f0914afd2e
      <SaleForm products={medicamentos} />
    </div>
  );
}

export default VentasPage;
