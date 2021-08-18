import React from 'react';
import{Routes, Route} from 'react-router';

import firebase, { FirebaseContext } from './firebase';

import Reservas from './components/paginas/Reservas';
import Menu from './components/paginas/Menu';
import NuevoRoom from './components/paginas/NuevoRoom';
import Sidebar from './components/ui/Sidebar';
import Promocion from './components/paginas/promociones';
import NuevoPromocion from './components/paginas/NuevoPromocion';
import Actividades from'./components/paginas/ActividadesList'
import NuevoActividades from'./components/paginas/NuevoActividades'
import Habitaciones from './components/paginas/Habitaciones';
import EditarRoom from './components/paginas/EditarRoom';
import EditarPromocion from './components/paginas/EditarPromocion';
import EditarActividades from './components/paginas/EditarActividades';



function App() {
  return (
    <FirebaseContext.Provider
    value={{
      firebase
    }}
    >
      <div className="md:flex min-h-screen">
        <Sidebar/>
            <div className="md:w-3/5 xl:w-4/5 p-6">
              <Routes>
              <Route path="/" element={<Habitaciones /> } />
              <Route path="/Habitaciones" element={<Habitaciones /> } />
              <Route path="/NuevoRoom" element={<NuevoRoom /> } />
              <Route path="/promociones" element={<Promocion /> }/>
              <Route path="/NuevoPromocion" element={<NuevoPromocion /> }/>
              <Route path="/Actividades" element={<Actividades /> }/>
              <Route path="/NuevoActividades" element={<NuevoActividades /> }/>
              <Route path='/EditarRoom/:id' element={<EditarRoom /> }/>
              <Route path='/EditarPromocion/:id' element={<EditarPromocion /> }/>
              <Route path='/EditarActividades/:id' element={<EditarActividades /> }/>
              </Routes> 
            </div>
     
      </div>
    </FirebaseContext.Provider>
  )
}

export default App;
