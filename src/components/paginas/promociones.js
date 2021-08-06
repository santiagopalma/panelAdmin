import React, {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import { FirebaseContext} from '../../firebase';
import Promocion from '../ui/DetPromocion';

const Promociones = () => {

    // definir el state para las habitaciones
    const [ promociones, guardarHabitaciones] = useState([]);

    const { firebase } = useContext(FirebaseContext);

    //consultar la base de datos al cargar 
    useEffect(() => {
        const obtenerHabitaciones =  () => {
            const resultado =  firebase.db.collection('Promociones').onSnapshot(manejarSnapshot);        
        }
        
        obtenerHabitaciones();
    }, []);

        //Snapshot nos permite usar la bs en tiempo real de firestore
        function manejarSnapshot(snapshot) {
            const promociones = snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    ...doc.data()
                }
            });

            //almacenar los resultados en el state
             guardarHabitaciones(promociones);

        }  
        return (
        <>
            <h1 className="text-3xl font-light mb-4">Promociones</h1>
            <Link to="/NuevoPromocion" className="bg-blue-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                Agregar Promocion
            </Link>
            {promociones.map(promocion => (
                <Promocion
                    key={promocion.id}
                    habitacion={promocion}
                />
            ))}
            
        </>
    );
}


export default Promociones;