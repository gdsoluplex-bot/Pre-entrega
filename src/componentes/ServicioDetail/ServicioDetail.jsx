import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from "firebase/firestore"; 
import { db } from '../../firebase/config';

const ServicioDetail = () => {

  const { id } = useParams();

  const [servicio, setServicio] = useState(null);

  useEffect(() => {
    if (id) {
// Creamos la referencia al documento 
  const docRef = doc(db, "servicios", id); 
  getDoc(docRef) 
    .then((resp) => { 
      if (resp.exists()) { // Verificamos si el documento existe 
          setServicio({ ...resp.data(), id: resp.id }); 
        } else { 
          console.log("No se encontró el producto"); 
        } 
      }) 
      .catch(error => console.log(error)); 
    } 
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
      <p><strong>Género:</strong> {servicio.rubro}</p>
      <p><strong>Sesión:</strong> {servicio.duracion}</p>
      <p><strong>Descripción:</strong> {servicio.descripcion}</p>
      <p><strong>Costo:</strong> {servicio.costo}</p>

    </div>
  );
}

export default ServicioDetail;