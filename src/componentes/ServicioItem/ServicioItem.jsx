import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";


function ServicioItem({ id, servicio, poster, costo, stock }) {

  const [favorito, setFavorito] = useState(false);
  
  const marcarComoFavorito = () => {
    setFavorito(!favorito)
  }

  const producto = {
    id: servicio.id,
    nombre: servicio.titulo,
    poster: servicio.poster,
    destacado: servicio.destacado,
    disponible: servicio.stock,
    precio: servicio.costo,
    stock: servicio.stock
  };

  const [cantidad, setCantidad] = useState(1);

  //funciones incrementar y decrementar
  const incrementar = () => {
    if (cantidad < (servicio.stock - cantidadActual) ) {
      setCantidad(cantidad + 1);
    }
  };

  const decrementar = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  const { addToCart, getCantidadActual } = useCart();

  const handleAddToCart = () => {

    addToCart(producto, cantidad);
    alert(`Agregaste ${cantidad} unidades de ${servicio.titulo} al carrito.`);
  };

  const cantidadActual = getCantidadActual(producto.id);

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
            marcarComoFavorito();
          }}
        >
          {favorito ? '⭐' : '☆'}
        </span>

      </div>

      <p>{servicio.rubro}</p>

      <p>Duración: {servicio.duracion}</p>

      <p>Disponibles: {servicio.stock - cantidadActual}</p>

      <p>Valor: $ {servicio.costo}</p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "10px",
          marginTop: "10px"
        }}
      >
        <button onClick={decrementar}>
          -
        </button>

        <span>{cantidad}</span>

        <button onClick={incrementar}>
          +
        </button>
      </div>

      <p><button
        onClick={handleAddToCart}>
        Agregar al Carrito
      </button></p>

      {cantidadActual > 0 && ( 
        <h4>Agregaste {cantidadActual} 
        {cantidadActual === 1 ? " servicio" : " servicios"}
        {" "} al carrito</h4>
      )}
    </div>
  );

}

export default ServicioItem;