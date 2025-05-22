import { useEffect, useState } from "react";

function App() {
  const [criptos, setCriptos] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Usar un proxy CORS para evitar problemas de CORS
    fetch("https://cors-anywhere.herokuapp.com/https://api.coincap.io/v2/assets")
      .then((resp) => {
        if (!resp.ok) throw new Error("Respuesta de red no fue ok");
        return resp.json();
      })
      .then((data) => {
        setCriptos(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al cargar la API:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (error) return <p>Error: No se pudieron cargar los datos</p>;
  
  return (
    <>
      <h1>Lista de Criptomonedas</h1>
      {loading ? (
        <p>Cargando datos...</p>
      ) : (
        <ol>
          {criptos.map((cripto) => (
            <li key={cripto.id}>
              Nombre: {cripto.name} - Precio: ${parseFloat(cripto.priceUsd).toFixed(2)}
            </li>
          ))}
        </ol>
      )}
    </>
  );
}

export default App;