import React, {useContext, useRef}from 'react';
import { FirebaseContext} from '../../firebase';
import {Link} from 'react-router-dom';

const DetActividades = ({habitacion}) => {

    //Existencia ref para acceder al valor directamente

    const existenciaRef = useRef(habitacion.existencia);
    // context de firebase para cambios en la BD

    const { firebase} = useContext(FirebaseContext)

    const {id, Capacidad, Descripcion, Imagen,  Duracion, Hora, Titulo, fechaInicio, existencia} = habitacion;

    //modificar el estado de la habitacion en firebase 

    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value ==="true");
        
        try {
            firebase.db.collection('Actividades')
                .doc(id)
                .update({
                    existencia,
                    
                });
        } catch (error) {
            console.log(error);
        }
        
    }

    const deleteobject = async(id)  => {
        if(window.confirm("Seguro que deseas eliminar esta actividad"))
            await firebase.db.collection('Actividades').doc(id).delete();

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
                    <p className="font-bold text-2xl text-gray-800 mb-4">{Titulo}</p>
                      
                       <p className="text-gray-600 mb-4">Capacidad: {''}
                        <span className="text-gray-700 font-bold"> {Capacidad} </span>
                        </p> 
                     
                        <p className="text-gray-600 mb-4">Fecha de Inicio: {''}
                        <span className="text-gray-700 font-bold">  {fechaInicio} </span>
                        </p> 
                        <p className="text-gray-600 mb-4">Duracion: {''}
                        <span className="text-gray-700 font-bold">  {Duracion} </span>
                        </p> 
                        <p className="text-gray-600 mb-4">Titulo: {''}
                        <span className="text-gray-700 font-bold">  {Titulo} </span>
                        </p> 
                        <p className="text-gray-600 mb-4">Descripcion: {''}
                        <span className="text-gray-700 font-bold">  {Descripcion} </span>
                        </p> 
                        <p className="text-gray-600 mb-4">Hora: {''}
                        <span className="text-gray-700 font-bold">  {Hora} </span>
                        </p> 


                        <div class="flex-container" >
                            <div class="bordesbutton" >
                                <button onClick={() => deleteobject(id)} className="bg-red-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold" > ELIMINAR</button>
                            </div>
                            <div class="bordesbutton" >
                                <button className=" bg-yellow-500 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                                <Link to={`/EditarActividades/${id}`} >
                                        Editar
                                    </Link>
                                </button>
                            </div>
                        </div>
                     
                    </div>
                </div>
           </div>
       </div> 
    );


}

export default DetActividades;