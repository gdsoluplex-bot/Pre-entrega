import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

function ServicioDetail() {

  const { id } = useParams();

  const [servicio, setservicio] = useState(null);

  useEffect(() => {

    fetch('/data/servicios.json')
      .then(response => response.json())
      .then(data => {

      
      const servicioFound = data.find(
        (item) => item.id === parseInt(id)
      );



        setservicio(servicioFound);

      })
      .catch(error =>
        console.error(
          'Error al cargar servicio:',
          error
        )
      );

  }, [id]);

  // Loading
  if (!servicio) {
    return <h2>Cargando Servicio...</h2>;
  }

  // Error
  if (!servicio.id) {
    return <h2>Servicio no encontrada</h2>;
  }

  return (

    <div style={{ padding: '20px' }}>

      <h1>{servicio.titulo}</h1>

      <img
        src={servicio.poster}
        alt={servicio.titulo}
        width="300"
      />
      <p>
        <strong>Género:</strong> {servicio.rubro}
      </p>

      <p>
        <strong>Sesión:</strong> {servicio.duracion}
      </p>

      <p>
        <strong>Descripción:</strong> {servicio.descripcion}
      </p>

    </div>
  );
}

export default ServicioDetail;