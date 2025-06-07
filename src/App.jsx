import { useEffect, useState } from "react";
import "./App.scss";
import { Outputs, OutputsR } from "./components/outputs";
import data from "./js/data";
import "./styles/recomenda.scss";
import "./styles/mobill.scss";

function App() {
  const [datos, setDatos] = useState([]);
  const [recomendaciones, setRecomendaciones] = useState(false);
  const [array, setArray] = useState([]);
  const [objeto, setObjeto] = useState({});
  const [valorBuscado, setValor] = useState("");

  const claseRecomendaciones = recomendaciones ? "recomendaciones" : "Rnone";

  //cargar datos
  useEffect(() => {
    const cargar = async () => {
      try {
        const datos = await data();
        if (datos) setDatos(datos);
      } catch (error) {
        console.log(error);
      }
    };
    cargar();
  }, []);

  // obtener datos
  const obtener = (e) => {
    setValor(e.target.value);
  };
  // buscar medicamento

  const buscar = (e) => {
    if (e.target.tagName === "OUTPUT") {
      const medi = datos.find((elemento) => {
        return elemento.Nombre.toLowerCase() === e.target.value.toLowerCase();
      });

      setObjeto(medi);
      setRecomendaciones(false);
      if (medi) return;
    }

    const valor = valorBuscado.trim().toLowerCase();
    console.log("first");
    console.log(objeto);
    // Buscar coincidencia exacta
    let resultado = datos.find(
      (elemento) => elemento.Nombre.toLowerCase() === valor
    );

    if (resultado) {
      setRecomendaciones(false);
      setObjeto(resultado);
    } else {
      // Buscar coincidencias parciales (contiene)
      const resultadosFiltrados = datos.filter((elemento) =>
        elemento.Nombre.toLowerCase().includes(valor)
      );

      if (resultadosFiltrados.length > 0) {
        setArray(resultadosFiltrados);
        setRecomendaciones(true);
      } else {
        alert(`"${valorBuscado}" no existe en la base de datos.`);
      }
    }
  };

  return (
    <>
      <main className="main">
        <section>
          <input
            onKeyDown={(e) => {
              if (e.key === "Enter") buscar(e);
            }}
            onChange={obtener}
            type="text"
            placeholder="Buscar medicamento"
          ></input>
          <button onClick={buscar}>Consultar</button>

          <div className={claseRecomendaciones} onClick={buscar}>
            {array.map((elemento, index) => {
              return <OutputsR key={index} nombre={elemento.Nombre}></OutputsR>;
            })}
          </div>
        </section>
        <section className="section2">
          <div>
            {Object.keys(objeto).map((valor, index) => {
              return <Outputs key={index} texto={valor}></Outputs>;
            })}
          </div>

          <div>
            {Object.values(objeto).map((valor, index) => {
              return <Outputs key={index} texto={valor}></Outputs>;
            })}
          </div>
        </section>
      </main>
    </>
  );
}

export default App;
