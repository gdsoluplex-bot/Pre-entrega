function TarjetaContacto({ nombre, email, puesto, foto }) {
  return (
    <div style={{
      backgroundColor: "#222",
      color: "white",
      padding: "10px",
      borderRadius: "8px",
      textAlign: "center"
    }}>

      <img
        src={foto}
        alt={nombre}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "cover",
          borderRadius: "6px"
        }}
      />

      <div className="card-body">
        <h4>{nombre}</h4>
        <p className="mb-1">{puesto}</p>

        <small style={{
          wordBreak: "break-all",
          fontSize: "11px"
        }}>
          {email}
        </small>

      </div>

    </div>
  );
}

export default TarjetaContacto;