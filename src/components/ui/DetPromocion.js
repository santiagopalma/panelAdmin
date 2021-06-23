import React, {useContext, useRef}from 'react';
import { FirebaseContext} from '../../firebase';
import firebaseConfig from '../../firebase/config';

const DetPromocion = ({habitacion}) => {

    //Existencia ref para acceder al valor directamente

    const existenciaRef = useRef(habitacion.existencia);
    // context de firebase para cambios en la BD

    const { firebase} = useContext(FirebaseContext)

    const {id, nombre, existencia, Imagen, Precio, n_camas, f_inicial, f_final} = habitacion;

    //modificar el estado de la habitacion en firebase 

    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value ==="true");
        
        try {
            firebase.db.collection('Promociones')
                .doc(id)
                .update({
                    existencia,
                    
                });
        } catch (error) {
            console.log(error);
        }
        
    }

    return(
       <div className="w-full px-3 mb-4">
           <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                       <img src={Imagen} alt="imagen habitacion" />

                        <div className="sm:flex sm:-mx-2 pl-2">
                            <label className="block mt-5 sm:w-2/4">
                                <span className="block text-gray-800 mb-2">Existencia</span>
                                <select 
                                    className="bg-white shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                    value={existencia}
                                    ref={existenciaRef}
                                    onChange={() => actualizarDisponibilidad()}
                                    >
                                    <option value="true">Disponible</option>
                                    <option value="false">No Disponible</option>
                                </select>
                            </label>
                        </div>
                    
                    </div>
                    <div className="lg:w-7/12 xl:w-9/12 pl-5">
                       <p className="font-bold text-2xl text-gray-800 mb-4">{nombre}</p>
                       <p className="text-gray-600 mb-4">Numero de camas: {''}
                        <span className="text-gray-700 font-bold"> {n_camas} </span>
                        </p> 
                        {/* <p className="text-gray-600 mb-4">{descripcion}</p>  */}
                        <p className="text-gray-600 mb-4">Precio: {''}
                        <span className="text-gray-700 font-bold">  $ {Precio} </span>
                        </p> 
                        <p className="text-gray-600 mb-4">Fecha de Inicio: {''}
                        <span className="text-gray-700 font-bold">  {f_inicial} </span>
                        </p> 
                        <p className="text-gray-600 mb-4">Fecha Final: {''}
                        <span className="text-gray-700 font-bold">  {f_final} </span>
                        </p> 
                    </div>
                </div>
           </div>
       </div> 
    );


}

export default DetPromocion;