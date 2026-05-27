import styles from './footer.module.css';
import Directorio from "../equipo/Directorio";

function Footer() {

  return (
    <footer
      style={{
        padding: '20px',
        textAlign: 'center',
        backgroundColor: 'rgb(67, 184, 247)',
        color: 'white',
        marginTop: '40px',
      }}
    >

  <div style={{ marginTop: "30px" }}>
    <h4>Equipo</h4>
    <Directorio />
  </div>

        <p id="copyright">Tu Bienestar © 2026 Todos los derechos reservados</p>

    </footer>
  );
}

export default Footer;