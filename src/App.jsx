import { Routes, Route } from 'react-router-dom';

import Layout from './componentes/Layout/Layout.jsx';

import Inicio from './componentes/Inicio/Inicio';

import ServicioListContainer from './componentes/ServicioListContainer/ServicioListContainer.jsx';

import ServicioFormContainer from './componentes/ServicioFormContainer/ServicioFormContainer.jsx';

import ServicioDetail from './componentes/ServicioDetail/ServicioDetail.jsx';

function App() {

  return (

    <Routes>

      <Route element={<Layout />}>

        <Route
          path="/"
          element={<Inicio />}
        />

        <Route
          path="/servicios"
          element={<ServicioListContainer />}
        />

        <Route
          path="/destacados"
          element={<ServicioListContainer destacados={true} />
          }
        />

        <Route
          path="/alta"
          element={<ServicioFormContainer />}
        />

        <Route
          path="/servicio/:id"
          element={<ServicioDetail />}
        />

        <Route
          path="*"
          element={<h1>404 - Página no encontrada</h1>}
        />

      </Route>

    </Routes>
  );
}

export default App;