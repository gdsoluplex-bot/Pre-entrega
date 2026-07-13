import { Routes, Route } from 'react-router-dom';
import Layout from './componentes/Layout/Layout.jsx';
import Inicio from './componentes/Inicio/Inicio';
import ServicioListContainer from './componentes/ServicioListContainer/ServicioListContainer.jsx';
import ServicioDetail from './componentes/ServicioDetail/ServicioDetail.jsx';
import Cart from './componentes/Cart/Cart.jsx';
import GestionServicios from './componentes/GestionServicios/GestionServicios.jsx';
import GestionCupones from "./componentes/GestionCupones/GestionCupones";
import Login from './componentes/Login/Login.jsx';
import Registro from './componentes/Registro/Registro.jsx';
import ProtectedRoute from './componentes/ProtectedRoute/ProtectedRoute.jsx';

function App() {

  return (
    <Routes>
      <Route element={<Layout>
      </Layout>}>
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<ServicioListContainer mensaje={"Nuestros Servicios"}/>} />
        <Route path="/destacados" element={<ServicioListContainer destacados={true} mensaje={"Servicios Destacados"}/> } />
        <Route path="/carrito" element={<Cart />} />
        <Route path="/cupones" element={<GestionCupones />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/registro" element={<Registro/>} />
        <Route path="*" element={<h1>404 - Página no encontrada</h1>} />

        <Route path="/gestion" element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionServicios />
            </ProtectedRoute>
        }/>

        <Route path="/cupones" element={
            <ProtectedRoute rolesPermitidos={["admin"]}>
              <GestionCupones />
            </ProtectedRoute>
        }/></Route>


    </Routes>
  );
}

export default App;