import { useState } from 'react';
import { Link } from 'react-router-dom';
import Contador from "../Contador/Contador";

function ServicioItem({ servicio }) {

  const [favorito, setFavorito] = useState(false);

  const toggleFavorito = () => {
    setFavorito(!favorito);
  };

  return (


    <div style={{
      border: '1px solid #ccc',
      padding: '15px',
      borderRadius: '10px',
      backgroundColor: '#fff',
      textAlign: "center"
    }}

    >


      <Link to={`/servicio/${servicio.id}`}>
        <img
          src={servicio.poster}
          alt={servicio.titulo}
          style={{ width: "100%", height: "200px", objectFit: "cover" }}
        />
      </Link>

      {/* 👇 TITULO + ESTRELLA */}
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        marginTop: "10px"
      }}>

        <Link to={`/servicio/${servicio.id}`} >
          <h2 style={{ margin: 0 }}>
            {servicio.titulo}
          </h2>
        </Link>

        <span
          style={{ cursor: "pointer", fontSize: "20px" }}
          onClick={(e) => {
            e.preventDefault();      // 👈 IMPORTANTÍSIMO
            toggleFavorito();
          }}
        >
          {favorito ? '⭐' : '☆'}
        </span>

      </div>


      <p>{servicio.rubro}</p>

      <p>{servicio.duracion}</p>



      <Contador />

    </div>
  );
}

export default ServicioItem;