import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext';

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

  // 2. Usamos el hook para acceder a la función 
  const { getCartQuantity } = useCart(); 
  const {user, logout} =useAuth();
  const totalItems = getCartQuantity();

  return (
    <header>

      <nav style={navStyle}>
        <Link to="/" style={linkStyle}> Inicio </Link>
        <Link to="/servicios" style={linkStyle}> Servicios </Link>
        <Link to="/destacados" style={linkStyle}> Destacados </Link>
      
   
        <Link to="/carrito" style={linkStyle}> Carrito {totalItems > 0 && <span>{totalItems} </span>}</Link>🛒


          {user ? ( 
            <>{/* Mostrar Gestion SOLO si el usuario es admin */} 
              {user.rol === 'admin' && ( 
            <Link to="/gestion" style={linkStyle}>Gestion de Servicios</Link>)} 
            <Link to="/cupones" style={linkStyle}>Gestión de Cupones</Link>
            <span>¡Hola, {user.email}!</span> 
            <button onClick={logout}>Cerrar Sesión</button> 
          </> 
        ) : ( 
          <Link to="/login" style={linkStyle} >Login</Link> 
        )} 

      </nav>

    </header>
  );
}

export default Header;