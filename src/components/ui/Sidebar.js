import React from 'react';
import {NavLink} from 'react-router-dom';

const Sidebar = () => {
    return (
        
         <div className="md:w-2/5 xl:w-1/6 bg-blue-800">
             <div className="p-6">
                <p className="uppercase text-white text-2xl tracking-wide text-center font-bold"> Hosteria</p>
                <p className="mt-3 text-black-600">:</p>
             
                <nav className="mt-10">
                    <NavLink className="p-1 text-white block hover:bg-gray-600 hover: text-white-500" activeClassName ="text-white-500" exact="true" to="/Habitaciones">Habitaciones</NavLink>
                    <NavLink className="p-1 text-white block hover:bg-gray-600 hover: text-white-500" activeClassName="text-white-500" exact="true" to="/promociones">Promociones</NavLink>
                    <NavLink className="p-1 text-white block hover:bg-gray-600 hover: text-white-500" activeClassName="text-white-500" exact="true" to="/actividades">Actividades</NavLink> 
                    {/* <NavLink className="p-1 text-white block hover:bg-gray-600 hover: text-white-500" activeClassName="text-white-500" exact="true" to="/">Reservas</NavLink>  */}

                     
                </nav>
             </div>
         </div>
        
        
    );
}

export default Sidebar;

