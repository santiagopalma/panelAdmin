import React, {useState, useContext} from 'react';
import { FirebaseContext } from '../../firebase';

const Reserva = ({reserva}) => {

    const [tiempo, guardarTiempo] = useState(0);
    
    //Context de firebase

    const { firebase } = useContext(FirebaseContext);

    // define el tiempo de entrega en tiempo real

    const definirTiempo = id => {
        try {
          firebase.db.collection('ordenes')
            .doc(id)  
            .update({
                tiempo
            })
        } catch (error) {
            console.log(error);
        }
    }

        //Completar el estado de una reserva

        const completarReserva = id => {
            try {
                firebase.db.collection('ordenes')
                .doc(id)
                .update({
                    completado: true
                })
                
            } catch (error) {
                console.log(error);
                
            }
        }
    
    return (
        <div className="sm:w-1/2 lg:w-1/3 px-2 mb-4">
            <div className="p-3 shadow-md bg-white">
                <h1 className="text-gray-800 text-lg font-bold">{reserva.id}</h1>
                {reserva.orden.map( habitaciones =>(
                    <p className="text-gray-600">{habitaciones.cantidad} {habitaciones.nombre}</p>
                ))}
                         
                <p className="text-gray-700 font-bold">Total a Pagar: $ {reserva.total}</p>
                {reserva.tiempo === 0 && ( 
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Tiempo para confirmar su reserva
                        </label>
                        <input
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            min="1"
                            max="200000000000000000"
                            placeholder="20000000"
                            value={tiempo}
                            onChange={ e => guardarTiempo (parseInt(e.target.value))}
                        />

                        <button
                            onClick={() => definirTiempo(reserva.id)}
                            type="submit"
                            className="bg-gray-800 hover:bg-gray-900 w-full mt-5 p-2 text-white uppercase font-bold"
                        >
                            Definir tiempo
                        </button>

                     </div>   
                )}

                {reserva.tiempo >0 && (
                   <p className="text-gray-500">Tiempo para confirmar reserva:
                    <span className="font-bold">{reserva.tiempo}Minutos</span>
                   </p> 
                )}
                
                {!reserva.completado && reserva.tiempo >0 &&  (
                    <button
                    type= "button"
                    className="bg-blue-800 hover:bg-blue-700 w-full mt-5 p-2 text-white uppercase font-bold"
                    onClick={ () => completarReserva( reserva.id )}
                    >
                        Marcar como lista 
                    </button>
                )}

            </div>
        </div>
    );
}

export default Reserva; 