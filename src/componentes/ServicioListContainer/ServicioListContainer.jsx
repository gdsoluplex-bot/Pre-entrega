
import { useEffect, useState } from 'react';
import ServicioItem from '../ServicioItem/ServicioItem';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase/config';

function ServicioListContainer({ destacados, mensaje }) {
  const [servicios, setServicios] = useState([]);

useEffect(() => {
  const serviDB = collection(db, "servicios");
  getDocs(serviDB).then((resp) => {
    const data = resp.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id
    }));

    if (destacados) {
      setServicios(
        data.filter(servicio => servicio.destacado)
      );
    } else {
      setServicios(data);
    }

  });

}, [destacados]);


  return (
 <>
 <h1>{mensaje}</h1>
    
  <div style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
    gap: "20px",
    padding: "20px"
  }}>

      {servicios.map(servicio => (
        <ServicioItem key={servicio.id} servicio={servicio} />
      ))}
    </div>
</>
  );
}
export default ServicioListContainer;
