
import { useEffect, useState } from 'react';
import ServicioItem from '../ServicioItem/ServicioItem';

function ServicioListContainer({ destacados }) {
  const [servicios, setservicios] = useState([]);

  useEffect(() => {
    fetch('/data/servicios.json')
      .then(res => res.json())
      .then(data => {
        if (destacados) {
          setservicios(data.slice(0, 1)); // ejemplo
        } else {
          setservicios(data);
        }
      });
  }, [destacados]);

  return (
    
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
  );
}
export default ServicioListContainer;
