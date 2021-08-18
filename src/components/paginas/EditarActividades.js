import React, { useContext, useState} from 'react';
import { useFormik} from 'formik';
import * as Yup from 'yup'
import{ FirebaseContext} from '../../firebase';
import {useNavigate} from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import { useParams } from 'react-router';

const NuevoActividad = () => {

    //state para las imagenes
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState('');

    //Context con las operaciones de firebase
    const{ firebase } = useContext(FirebaseContext);

    //console.log(firebase);

    //Hook para redireccionar
    const navigate = useNavigate();

    //validacion y leer los datos del formulario
    var idActividad = useParams()['id'];
        
    const formik = useFormik({
        initialValues: {
            Capacidad: '',
            Descripcion: '',
            Duracion: '',
            Imagen: '',
            Hora: '',
            Titulo: '',
            fechaInicio: '',
        },
        validationSchema: Yup.object({
            Capacidad: Yup.string()
                        .min(1, 'La Capacidad de la actividad deben tener al menos 3 caracteres')
                        .required('La Capacidad de la actividad es obligatorio'),
            

            Descripcion: Yup.string()
                        .min(10, 'Debes agregar una descripcion')
                        .required('La descripcion es obligatoria'),
                        
                        
            fechaInicio: Yup.string()
                        .required('La fecha de cuando inicia la actividad es obligatorio'),


            Titulo: Yup.string()
                        .required('El titulo de la actividad es obligatoria'),


            Hora: Yup.string()
                        .required('La hora de la actividad es obligatoria'),

            Duracion: Yup.string()
                        .required('La duracion de la actividad es obligatoria'),

                        

        }),
        onSubmit: Actividad => {
            try{
                Actividad.existencia = true;
                Actividad.Imagen = urlimagen;
                firebase.db.collection('Actividades').doc(idActividad).update(Actividad);

                //Redireccionar 
                navigate('/Actividades')
            } catch (error) {
                console.log(error);
            }
        }
    });

    //Todo sobre las imagenes
    
    const handleUploadStart = () => {
        guardarProgreso(0);
        guardarSubiendo(true);
    }

    const handleUploadError = error => {
        guardarSubiendo(false);
        console.log(error);
    }

    const handleUploadSuccess = async nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);

        //Almacenar la URL de destino
        const url = await firebase
                .storage
                .ref("Actividades")
                .child(nombre)
                .getDownloadURL();

        console.log(url);
        guardarUrlimagen(url);
    }

    const handleProgress = progreso => {
        guardarProgreso(progreso);
        console.log(progreso);

    }


    return (
        <>
            <h1 className="text-3xl font-light mb-4"></h1>
            <div className="flex justify-center mt-10">
                <div className="w-full max-w-3xl ">
                   <form
                    onSubmit={formik.handleSubmit}
                   >
                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Titulo">Titulo de la Actividad</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Titulo"
                                type="text"
                                placeholder="Nombre de la Actividad"
                                value={formik.values.Titulo}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>
                       {formik.touched.Titulo && formik.errors.Titulo ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.Titulo}</p>
                           </div>
                       ):null}

                       
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fechaInicio">fecha de inicio de la actividad</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="fechaInicio"
                                type="text"
                                placeholder="Fecha Inicial de la Actividad"
                                value={formik.values.fechaInicio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>
                       {formik.touched.fechaInicio && formik.errors.fechaInicio ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.fechaInicio}</p>
                           </div>
                       ):null}


                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Duracion">Duracion de la actividad</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="Duracion"
                                    type="text"
                                    placeholder="Duracion de la Actividad"
                                    value={formik.values.Duracion}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                        </div>
                        {formik.touched.Duracion && formik.errors.Duracion ?(
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                                <p>{formik.errors.Duracion}</p>
                            </div>
                        ):null}

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Hora">Hora de la Actividad</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Hora"
                                type="text"
                                placeholder="Ingresar la hora de la actividad"
                                min="0"
                                value={formik.values.Hora}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>

                       {formik.touched.Hora && formik.errors.Hora ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.Hora}</p>
                           </div>
                       ):null}
                       

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Capacidad">Capacidad de la Actividad</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Capacidad"
                                type="number"
                                placeholder="Numero de personas disponible de la actividad"
                                min="0"
                                value={formik.values.Capacidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>

                       {formik.touched.Capacidad && formik.errors.Capacidad ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.Capacidad}</p>
                           </div>
                       ):null}

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Imagen">Imagen/</label>
                            <FileUploader
                              accept="image/*" 
                              id="Imagen"
                              name="Imagen" 
                              randomizeFilename
                              storageRef={firebase.storage.ref("Actividades")}
                              onUploadStart={handleUploadStart}
                              onUploadError={handleUploadError}
                              onUploadSuccess={handleUploadSuccess}
                              onProgress={handleProgress}
                            />
                       </div>

                        {subiendo && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{width: '${progreso}%'}}>
                                   {progreso} % 
                                </div>
                            </div>
                        )}

                        {urlimagen && (
                          <p className="bg-green-500 text-white p-3 text-center my-5">
                              La imagen se subio correctamente
                          </p>  
                        )}

                       {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria</label>
                            <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Precio"
                                name="categoria"
                                value={formik.values.categoria}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            >  
                                <option value="">-- Seleccione --</option> 
                                <option value="HabitacionSimple">Habitacion Simple</option>
                                <option value="Habitacion Doble">Habitacion Doble</option>
                                <option value="Suite">Suite</option>
                                <option value="Habitacion Triple">Habitacion Triple</option>
                                <option value="Suite presidencial">Suite Presidencial</option>
                                <option value="Habitacion sencilla">Habitacion Sencilla</option>
                            </select>
                       </div>
                       {formik.touched.categoria && formik.errors.categoria ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.categoria}</p>
                           </div>
                       ):null} */}

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Descripcion">Descripcion</label>
                            <textarea
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="Descripcion"
                                placeholder="Descripcion de la Actividad"
                                value={formik.values.Descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                       </div>

                       {formik.touched.Descripcion && formik.errors.Descripcion ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.Descripcion}</p>
                           </div>
                       ):null}



                       <input
                           type="submit"
                           className="bg-blue-800 hover:bg-blue-900 w-full mt-5 p-2 text-white uppercase font-bold" 
                           value="Editar Actividad"
                       />
                       
                       </form> 
                </div>
            </div>
        </>
    );
}

export default NuevoActividad;