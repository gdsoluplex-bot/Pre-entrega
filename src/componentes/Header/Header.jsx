import { Link } from 'react-router-dom';

function Header() {

  const navStyle = {
    display: 'flex',
    gap: '20px',
    padding: '20px',
    backgroundColor: 'rgb(67, 184, 247)',
  };

  const linkStyle = {
    color: 'black',
    textDecoration: 'none',
    fontWeight: 'bold',
  };

  return (
    <header>

      <nav style={navStyle}>

        <Link to="/" style={linkStyle}>
          Inicio
        </Link>

        <Link to="/servicios" style={linkStyle}>
          Servicios
        </Link>

        <Link to="/destacados" style={linkStyle}>
          Destacados
        </Link>

        <Link to="/alta" style={linkStyle}>
          Alta de Servicio
        </Link>

      </nav>

    </header>
  );
}

export default Header;