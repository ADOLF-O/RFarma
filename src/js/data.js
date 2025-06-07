// todo: los datos locales no son los mismos que los de github

export default async function data() {
  if (navigator.onLine) {
    try {
      const respons = await fetch(
        `RFarm/datos/datos.json`
        //fd
        //`https://raw.githubusercontent.com/ADOLF-O/datosjson/refs/heads/main/datos.json`
      );

      if (!respons.ok) throw new Error("Fallo al obtener los datos");

      const datosJSon = await respons.json();

      localStorage.setItem("datosGuardados", JSON.stringify(datosJSon));
      return datosJSon;
    } catch (error) {
      console.log(error);
      return null;
    }
  } else {
    const datosJSon = JSON.parse(localStorage.getItem("datosGuardados"));

    return datosJSon;
  }
}
