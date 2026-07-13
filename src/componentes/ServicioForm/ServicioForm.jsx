function ServicioForm({
  servicioData,
  handleChange,
  handleSubmit,
  handlePosterChange,
  loading,
  modoEdicion
}) {

  const formStyle = {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    maxWidth: "400px",
    margin: "20px auto",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>

    <h2>{modoEdicion
        ? "Editar Servicio"
        : "Agregar Nuevo Servicio"}
    </h2>
      <div>   
        <label>Id: </label>
       <input
        type="text"
        name="id"
        placeholder="Id"
        value={servicioData.id}
        onChange={handleChange}
      />
      </div>
      <div>   
         <label>Título: </label>
      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={servicioData.titulo}
        onChange={handleChange}
      />
      </div>

      <div>   
        <label>Rubro: </label>
      <input
        type="text"
        name="rubro"
        placeholder="Rubro"
        value={servicioData.rubro}
        onChange={handleChange}
      />
      </div>

      <div>   
        <label>Destacado: </label>
      <input
        type="checkbox"
        name="destacado"
        placeholder="Destacado"
        checked={servicioData.destacado}
        onChange={handleChange}
      />
      </div>

      <div>   
        <label>Duracion: </label>
      <input
        type="text"
        name="duracion"
        placeholder="Duración"
        value={servicioData.duracion}
        onChange={handleChange}
      />
      </div>
      
      <div>   
        <label>Costo: </label>
      <input
        type="number"
        name="costo"
        placeholder="Costo"
        value={servicioData.costo}
        onChange={handleChange}
      />
      </div>

      <div>   
        <label>Costo: </label>
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={servicioData.stock}
        onChange={handleChange}
      />
      </div>

      <div>   
        <label>Descripcion: </label>      
      <input
        type="text"
        name="descripcion"
        placeholder="Descripcion"
        value={servicioData.descripcion}
        onChange={handleChange}
      />
      </div>


      <input
        type="file"
        onChange={handlePosterChange}
      />

      <button type="submit" disabled={loading}>
        {loading
        ? "Procesando..."
          : modoEdicion
        ? "Actualizar Producto"
        : "Guardar Producto"}
      </button>

    </form>
  );
}

export default ServicioForm;