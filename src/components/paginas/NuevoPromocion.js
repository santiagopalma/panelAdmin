import React, { useContext, useState} from 'react';
import { useFormik} from 'formik';
import * as Yup from 'yup'
import{ FirebaseContext} from '../../firebase';
import {useNavigate} from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';

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

    const formik = useFormik({
        initialValues: {
            nombre: '',
            Precio: '',
            categoria: '',
            Imagen: '',
            descripcion: '',
            f_final: '',
            f_inicial: '',
            n_camas:'',

        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                        .min(3, 'El nombre de la promocion deben tener al menos 3 caracteres')
                        .required('El nombre de la promocion es obligatorio'),
            

            Precio: Yup.number()
                        .min(1, 'Debes agregar un numero')
                        .required('El precio de la promocion es obligatorio'),
                        
                        
            f_inicial: Yup.string()
                        .required('La fecha de cuando inicia la promocion es obligatorio'),


            f_final: Yup.string()
                        .required('La fecha de cuando termina la promocion es obligatorio'),


            n_camas: Yup.string()
                        .required('El numero de camas es obligatorio'),

                        
            // descripcion: Yup.string()
            //             .min(10, 'La descripcion debe ser mas larga')
            //             .required('La descripcion de la habitacion es obligatorio'),

        }),
        onSubmit: promocion => {
            try{
                promocion.existencia = true;
                promocion.Imagen = urlimagen;
                firebase.db.collection('Promociones').add(promocion)
            
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

    const handleUploadSuccess = async nombre => {
        guardarProgreso(100);
        guardarSubiendo(false);

        //Almacenar la URL de destino
        const url = await firebase
                .storage
                .ref("Promociones")
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre de la Promocion</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre de la Promocion"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>
                       {formik.touched.nombre && formik.errors.nombre ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.nombre}</p>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="Precio">Precio de la Promocion</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="Precio"
                                type="number"
                                placeholder="Ingresar el precio de la promocion"
                                min="0"
                                value={formik.values.Precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>

                       {formik.touched.Precio && formik.errors.Precio ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.Precio}</p>
                           </div>
                       ):null}
                       

                       <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="n_camas">Numero de Camas</label>
                            <input
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="n_camas"
                                type="number"
                                placeholder="Numero de las camas"
                                min="0"
                                value={formik.values.n_camas}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                       </div>

                       {formik.touched.n_camas && formik.errors.n_camas ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.n_camas}</p>
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

                       {/* <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="descripcion">Descripcion</label>
                            <textarea
                               className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-40"
                                id="descripcion"
                                placeholder="Descripcion de habitacion"
                                value={formik.values.descripcion}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            ></textarea>
                       </div>

                       {formik.touched.descripcion && formik.errors.descripcion ?(
                           <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5"role="alert" >
                               <p>{formik.errors.descripcion}</p>
                           </div>
                       ):null} */}



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