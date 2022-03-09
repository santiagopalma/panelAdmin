import React, {useEffect,useState, useContext} from 'react';
import { FirebaseContext } from '../../firebase';
import ReservaDetalle from './ReservaDetalle';

const Reserva = ({habitacion}) => {

    //Context de firebase
    const { firebase } = useContext(FirebaseContext);

    const { email,name, cellphone} = habitacion;
    const [reservas, guardarReservas] = useState([]);
    
    useEffect(() =>{
         
        const obtenerReservas = () => {
            firebase.db.collection('usuarios').doc(email).collection("reservas").where("existencia","==",false).onSnapshot(manejarSnapshot);
        
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
        <div className="w-full px-3 mb-4">
           <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="w-full px-3 mb-4">
                       <div className="w-full px-3 mb-4">
                        <p className="font-bold text-2xl text-gray-800 lg-4">Información del cliente
                        </p>
                        <p className="text-gray-600 mb-4">Correo del cliente: {''}
                            <span className="text-gray-700 font-bold"> {email} </span>
                        </p>
                        <p className="text-gray-600 mb-4">Nombre: {''}
                            <span className="text-gray-700 font-bold"> {name} </span>
                        </p>
                        <p className="text-gray-600 mb-4">Telefono: {''}
                            <span className="text-gray-700 font-bold"> {cellphone} </span>
                        </p>
                        <div className="sm:flex sm:flex-wrap -mx-3">
                            {reservas.map(reserva =>(
                            <ReservaDetalle
                                key={reserva.id}
                                habitacion={reserva}
                                
                            />))}
                             
                        </div>
                                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Reserva; 