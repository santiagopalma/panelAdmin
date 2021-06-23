import React,{useEffect, useState, useContext}from 'react';
import { FirebaseContext } from '../../firebase';
import Reserva from '../ui/Reserva';

const Reservas = () => {

    // context con las operaciones de firebase

    const {firebase} = useContext(FirebaseContext);
    const [reservas, guardarReservas] = useState([]);

    useEffect(() =>{
         
        const obtenerReservas = () => {
            firebase.db.collection('ordenes').where('completado', "==", false).onSnapshot(manejarSnapshot);
        }
        obtenerReservas();
    }, []);

    function manejarSnapshot(snapshot) {
        const reservas = snapshot.docs.map(doc => {
            return {
               id: doc.id,
               ...doc.data() 
            }
        });
        guardarReservas(reservas);
            
    }


    return (
        <>
            <h1 className="text-3xl font-light mb-4">Reservas</h1>
            <div className="sm:flex sm:flex-wrap -mx-3">
                {reservas.map(reserva =>(
                    <Reserva
                        key={reserva.id}
                        reserva={reserva}
                    />
                ))}
            </div>
        </>
    );
}

export default Reservas;