import React, { useContext, useRef } from 'react';
import { FirebaseContext } from '../../firebase';
import { Link } from 'react-router-dom';


const Habitacion = ({ habitacion }) => {

    //Existencia ref para acceder al valor directamente

    const existenciaRef = useRef(habitacion.existencia);

    // context de firebase para cambios en la BD

    const { firebase } = useContext(FirebaseContext)

    const { id, nombre, imagen,imagen2, existencia, categoria, precio, descripcion, capacidad } = habitacion;

    var str = descripcion
    var array = str.split(",");
    const listItems = array.map((number, i) =>
        <li key={i}>{number}</li>
    );


    //modificar el estado de la habitacion en firebase 
    const actualizarDisponibilidad = () => {
        const existencia = (existenciaRef.current.value === "true");
        try {
            firebase.db.collection('productos')
                .doc(id)
                .update({
                    existencia
                });
        } catch (error) {
            console.log(error);
        }

    }
    const deleteobject = async (id) => {
        if (window.confirm("Seguro que deseas eliminar esta habitacion"))
            await firebase.db.collection('productos').doc(id).delete();

    }

    return (
        <div className="w-full px-3 mb-4">
            <div className="p-5 shadow-md bg-white">
                <div className="lg:flex">
                    <div className="lg:w-5/12 xl:w-3/12">
                        <img src={imagen} alt="imagen habitacion" />
                        <img src={imagen2} alt="imagen2 habitacion"/>
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
                        <p className="font-bold text-2xl text-gray-800 mb-4">{nombre}
                        
                        </p>
                        <p className="text-gray-600 mb-4">Categoria: {''}
                            <span className="text-gray-700 font-bold"> {categoria} </span>
                        </p>
                        <p className="text-gray-600 mb-4">Descripción: {''}</p>
                        <ul>{listItems}</ul>

                        <p className="text-gray-600 mb-4 mt-4">Precio: {''}
                            <span className="text-gray-700 font-bold">  $ {precio} </span>
                        </p>

                        <div class="flex-container" >
                            <div class="bordesbutton" >
                                <button onClick={() => deleteobject(id)} className="bg-red-800 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold" > ELIMINAR</button>
                            </div>
                            <div class="bordesbutton" >
                                <button className=" bg-yellow-500 hover:bg-blue-700, inline-block mb-5 p-2 text-white uppercase font-bold">
                                    <Link to={`/EditarRoom/${id}`}>
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

export default Habitacion;