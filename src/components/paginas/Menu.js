import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext} from '../../firebase';


import Habitacion from '../ui/Habitacion';

const Menu = () => {

    // definir el state para las habitaciones
    const [ habitaciones, guardarHabitaciones] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    //consultar la base de datos al cargar 
    useEffect(() => {
        const obtenerHabitaciones =  () => {
            const resultado =  firebase.db.collection('productos').onSnapshot(manejarSnapshot); 
            
        }
        obtenerHabitaciones();
    }, []);

        //Snapshot nos permite usar la bs en tiempo real de firestore
    
        function manejarSnapshot(snapshot) {
            const habitaciones = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            //almacenar los resultados en el state
             guardarHabitaciones(habitaciones);

        }  
        return (
        <>
            <h1 className="text-3xl font-light mb-4">menu</h1>
            <Link to="/NuevoRoom" className=" bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Habitacion
            </Link>
            {habitaciones.map(habitacion => (
                <Habitacion
                    key={habitacion.id}
                    habitacion={habitacion}
                />
            ))}
            
        </>
    );
}

export default Menu;