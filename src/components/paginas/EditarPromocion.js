import React, { useContext, useState} from 'react';
import { useFormik} from 'formik';
import * as Yup from 'yup'
import{ FirebaseContext} from '../../firebase';
import {useNavigate} from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import { useParams } from 'react-router';

const NuevoPromocion = () => {

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


    var idPromocion = useParams()['id'];

    const formik = useFormik({
        initialValues: {
            Titulo: '',
            Duracion: '',
            Imagen: '',
            Descripcion: '',
            f_final: '',
            f_inicial: '',
            Cantidad:'',

        },
        validationSchema: Yup.object({
            Titulo: Yup.string()
                        .min(3, 'El Titulo de la promocion deben tener al menos 3 caracteres')
                        .required('El Titulo de la promocion es obligatorio'),
            Descripcion: Yup.string()
                        .min(3, 'La Descripcion de la promocion deben tener al menos 3 caracteres')
                        .required('El Descripcion de la promocion es obligatorio'),
            

            Duracion: Yup.number()
                        .min(1, 'Debes agregar un numero')
                        .required('La duracion de la promocion es obligatorio'),
                        
                        
            f_inicial: Yup.string()
                        .required('La fecha de cuando inicia la promocion es obligatorio'),


            f_final: Yup.string()
                        .required('La fecha de cuando termina la promocion es obligatorio'),


            Cantidad: Yup.string()
                        .required('La cantidad de descuento es obligatorio'),

                
                        
            // descripcion: Yup.string()
            //             .min(10, 'La descripcion debe ser mas larga')
            //             .required('La descripcion de la habitacion es obligatorio'),

        }),
        onSubmit: promocion => {
            try{
                promocion.existencia = true;
                promocion.Imagen = urlimagen;
                firebase.db.collection('Promociones').doc(idPromocion).update(promocion);

                //Redireccionar 
                navigate('/promociones')
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

    const handleUploadSuccess = async Titulo => {
        guardarProgreso(100);
        guardarSubiendo(false);

        //Almacenar la URL de destino
        const url = await firebase
                .storage
                .ref("Promociones")
                .child(Titulo)
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Titulo">Titulo de la Promocion</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Titulo"
                                type="text"
                                placeholder="Titulo de la Promocion"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="f_inicial">fecha de inicio de la promocion</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="f_inicial"
                                type="text"
                                placeholder="Fecha Inicial de la Promocion"
                                value={formik.values.f_inicial}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>
                       {formik.touched.f_inicial && formik.errors.f_inicial ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.f_inicial}</p>
                           </div>
                       ):null}


                        <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="f_final">Fecha final de la promocion</label>
                                <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="f_final"
                                    type="text"
                                    placeholder="Fecha final de la promcion"
                                    value={formik.values.f_final}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                        </div>
                        {formik.touched.f_final && formik.errors.f_final ?(
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                                <p>{formik.errors.f_final}</p>
                            </div>
                        ):null}

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Duracion">Duracion de la Promocion</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Duracion"
                                type="number"
                                placeholder="Ingresar el Duracion de la promocion"
                                min="0"
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Cantidad">Cantidad de Descuento</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Cantidad"
                                type="number"
                                placeholder="Cantidad de descuento"
                                min="0"
                                value={formik.values.Cantidad}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>

                       {formik.touched.Cantidad && formik.errors.Cantidad ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.Cantidad}</p>
                           </div>
                       ):null}

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen/</label>
                            <FileUploader
                              accept="image/*" 
                              id="Imagen"
                              name="Imagen" 
                              randomizeFilename
                              storageRef={firebase.storage.ref("Promociones")}
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

                       

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                            <textarea
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="Descripcion"
                                placeholder="Descripcion de habitacion"
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
                           value="Agregar Promocion"
                       />
                       
                       </form> 
                </div>
            </div>
        </>
    );
}

export default NuevoPromocion;