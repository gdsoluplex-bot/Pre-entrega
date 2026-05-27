
import { useState } from "react";

function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div style={{ marginTop: "10px" }}>
      <p>Cantidad: {contador}</p>

      <button onClick={() => setContador(contador + 1)}>
        +
      </button>

      <button 
        onClick={() => setContador(contador - 1)}
        disabled={contador === 0}
      >
        -
      </button>
      <p><button >Comprar</button></p>

    </div>
  );
}

export default Contador;
