import ServicioListContainer from '../ServicioListContainer/ServicioListContainer.jsx';

function Inicio() {

  const heroStyle = {
    backgroundColor: 'rgb(122, 214, 237)',
    color: 'Black',
    padding: '30px 20px',
    textAlign: 'center',
  };

  return (
    <>

      
<section style={heroStyle}>

  <div style={{
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }}>

    <img 
      src="/logo_bienestar.webp" 
      alt="Logo Bienestar"
      style={{ width: "150px", marginBottom: "10px" }}
    />

      <h3>Tu lugar de Paz, Armonía y Sanación</h3>

  </div>

</section>


      <section style={{ padding: '20px' }}>

        <h2>⭐ Servicios destacados</h2>

        <ServicioListContainer destacados={true} />

      </section>

    </>
  );
}

export default Inicio;