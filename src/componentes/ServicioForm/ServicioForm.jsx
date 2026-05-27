function ServicioForm({
  servicioData,
  handleChange,
  handleSubmit,
  handlePosterChange,
  loading,
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

      <h2>Agregar Servicio</h2>

      <input
        type="text"
        name="titulo"
        placeholder="Título"
        value={servicioData.titulo}
        onChange={handleChange}
      />

      <input
        type="text"
        name="rama"
        placeholder="Rama"
        value={servicioData.rubro}
        onChange={handleChange}
      />

      <input
        type="number"
        name="duracion"
        placeholder="Duración"
        value={servicioData.duracion}
        onChange={handleChange}
      />

      <input
        type="file"
        onChange={handlePosterChange}
      />

      <button type="submit" disabled={loading}>
        {loading
          ? "Subiendo Servicio..."
          : "Guardar Servicio"}
      </button>

    </form>
  );
}

export default ServicioForm;