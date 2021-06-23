import React from 'react';
import{Routes, Route} from 'react-router';

import firebase, { FirebaseContext } from './firebase';

import Reservas from './components/paginas/Reservas';
import Menu from './components/paginas/Menu';
import NuevoRoom from './components/paginas/NuevoRoom';
import Sidebar from './components/ui/Sidebar';
import Promocion from './components/paginas/promociones';
import NuevoPromocion from './components/paginas/NuevoPromocion';



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
              <Route path="/" element={<Reservas /> } />
              <Route path="/Menu" element={<Menu /> } />
              <Route path="/NuevoRoom" element={<NuevoRoom /> } />
              <Route path="/promociones" element={<Promocion /> }/>
              <Route path="/NuevoPromocion" element={<NuevoPromocion /> }/>
              </Routes> 
            </div>
     
      </div>
    </FirebaseContext.Provider>
  )
}

export default App;
