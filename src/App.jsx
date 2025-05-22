import { useEffect } from "react"

function App() {

  const [criptos, setCriptos] = useState()


  useEffect(() => {
    fetch("https://api.coincap.io/v2/assets")
      .then((resp) => resp.json())
      .then((data) => {
        setCriptos(data.data)
      })
      .catch(() => {
        console.error("Error al cargar la API")
      })
  }, [])

  return (
    <>
      <h1>Lista de Criptomonedas</h1>
      <ol>
          { criptos.map((name, price) => (
            <li>Nombre: {name} Precio: {price}</li>

          ))} 
      </ol>

    </>
  );
}

export default App;
