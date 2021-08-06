import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext} from '../../firebase';
import Actividad from '../ui/DetActividades';

const Menu = () => {

    // definir el state para las habitaciones
    const [ actividades, guardarHabitaciones] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    //consultar la base de datos al cargar 
    useEffect(() => {
        const obtenerHabitaciones =  () => {
            const resultado =  firebase.db.collection('Actividades').onSnapshot(manejarSnapshot);        
        }
        
        obtenerHabitaciones();
    }, []);

        //Snapshot nos permite usar la bs en tiempo real de firestore
        function manejarSnapshot(snapshot) {
            const actividades = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            //almacenar los resultados en el state
             guardarHabitaciones(actividades);

        }  
        return (
        <>
            <h1 className="text-3xl font-light mb-4">Actividades</h1>
            <Link to="/NuevoActividades" className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Actividad
            </Link>
            {actividades.map(actividad => (
                <Actividad
                    key={actividad.id}
                    habitacion={actividad}
                />
            ))}
            
        </>
    );
}


export default Menu;