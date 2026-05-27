import { useState } from "react";
import ServicioForm from "../ServicioForm/ServicioForm.jsx";

function ServicioFormContainer() {

  const [servicioData, setservicioData] = useState({
    titulo: "",
    rubro: "",
    duracion: "",
  });

  const [posterFile, setPosterFile] = useState(null);

  const [loading, setLoading] = useState(false);

  // Manejar cambios de inputs
  const handleChange = (event) => {

    const { name, value } = event.target;

    setservicioData({
      ...servicioData,
      [name]: value,
    });
  };

  // Manejar cambio de imagen
  const handlePosterChange = (event) => {

    setPosterFile(event.target.files[0]);
  };

  // Manejar envío
  const handleSubmit = async (event) => {

    event.preventDefault();

    // Validación
    if (!posterFile) {
      alert("Debes seleccionar un poster");
      return;
    }

    setLoading(true);

    try {

      // Simulamos demora real
      await new Promise((resolve) =>
        setTimeout(resolve, 2000)
      );

      // API KEY
      const apiKey = 'b617e85d9593f6611bf328914d16be64';

      // FormData
      const formData = new FormData();

      formData.append("image", posterFile);

      console.log("Subiendo poster...");

      // Fetch a Imgbb
      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      // Validación respuesta
      if (!data.success) {
        throw new Error("Error al subir imagen");
      }

      // Servicio completo
      const nuevoServicio = {
        ...servicioData,
        poster: data.data.url,
      };

      // Simulación de envío a API
      console.log(
        "Enviando servicio a la API:",
        nuevoServicio
      );

      alert("Servicio enviado correctamente");

      // Limpiar formulario
      setservicioData({
        titulo: "",
        rama: "",
        duracion: "",
      });

      setPosterFile(null);

    } catch (error) {

      console.error(error);

      alert("No se pudo subir el servicio");

    } finally {

      setLoading(false);
    }
  };

  return (
    <ServicioForm
      servicioData={servicioData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      handlePosterChange={handlePosterChange}
      loading={loading}
    />
  );
}

export default ServicioFormContainer;