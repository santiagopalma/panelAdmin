import React, {useContext} from 'react';
import { FirebaseContext } from '../../firebase';
import moment from 'moment'
import 'moment/locale/es'

const ReservaDetalle = ({habitacion}) => {

    //const [tiempo, guardarTiempo] = useState(0);
    
    //Context de firebase
    const { firebase } = useContext(FirebaseContext);
    const { Imagen, existencia , total, nombre, precio, idCliente,id } = habitacion;

    const startDate=  moment(habitacion.startDate.toDate()).format('LL');
    const endDate=  moment(habitacion.endDate.toDate()).format('LL');
   
    console.log(id);
    
    const aprobarReserva = (idCliente,id) =>{
        try{
            firebase.db.collection('usuarios').doc(idCliente).collection('reservas').doc(id).update({existencia: true})
        }catch(error){
            console.log(error);
        }
    }

    const deleteobject = async (idCliente,id) => {
            if (window.confirm("Seguro que deseas eliminar esta Reserva? "))
                await firebase.db.collection('usuarios').doc(idCliente).collection('reservas').doc(id).delete();
    
    }
    
    return (
        <div className="w-full px-3 mb-4">
           <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="w-full px-3 mb-4">
                       <div className="w-full px-3 mb-4">
                        <p className="font-bold text-2xl text-gray-800 lg-4">Detalle de la reserva pendiente
                        </p>
                        <p className="text-gray-600 mb-4 mt-4">Habitacion: {''}
                            <span className="text-gray-700 font-bold"> {nombre}  </span>
                        </p>
                        <p className="text-gray-600 mb-4 mt-4">Desde: {''}
                            <span className="text-gray-700 font-bold"> {startDate} </span>
                        </p>
                        <p className="text-gray-600 mb-4 mt-4">Hasta: {''}
                            <span className="text-gray-700 font-bold"> {endDate} </span>
                        </p>
                        <p className="text-gray-600 mb-4 mt-4">Precio por noche: {''}
                            <span className="text-gray-700 font-bold"> {precio} </span>
                        </p>
                        <p className="text-gray-600 mb-4 mt-4">Total: {''}
                            <span className="text-gray-700 font-bold">  $ {total} </span>
                        </p>
                        <div className="lg:w-7/12 xl:w-9/12 pl-5">
                                    <div class="flex-container" >
                                            <div class="bordesbutton" >
                                                <button onClick={() => deleteobject(idCliente,id)} className="bg-red-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold" > ELIMINAR </button>
                                            </div>
                                            <div class="bordesbutton" >
                                                <button onClick={() => aprobarReserva(idCliente,id)}  className=" bg-green-500 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold"> APROBAR </button>
                                            </div>
                                    </div>
                                </div>                             
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReservaDetalle; 