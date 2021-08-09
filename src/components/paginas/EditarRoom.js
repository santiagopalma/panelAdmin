import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { FirebaseContext } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import FileUploader from 'react-firebase-file-uploader';
import { useParams } from 'react-router';


const EditRoom = () => {

    //state para las imagenes
    const [subiendo, guardarSubiendo] = useState(false);
    const [progreso, guardarProgreso] = useState(0);
    const [urlimagen, guardarUrlimagen] = useState('');
    

    //Context con las operaciones de firebase
    const { firebase } = useContext(FirebaseContext);
    // var data = firebase.db.collection('productos').doc(useParams()['id']);

    // data.get().then((doc) => {
    //     if (doc.exists) { 

    //         console.log("Document data:", doc.data());
    //         // console.log(doc.data()['precio']);
    //     } else {
    //         // doc.data() will be undefined in this case
    //         console.log("No such document!");
    //     }
    // }).catch((error) => {
    //     console.log("Error getting document:", error);
    // });


    //Hook para redireccionar
    const navigate = useNavigate();


    

    //validacion y leer los datos del formulario

    var idHabitacion = useParams()['id'];
    const formik = useFormik({

        initialValues: {
            nombre: '',
            precio: '',
            categoria: '',
            imagen: '',
            descripcion: '',
        },
        validationSchema: Yup.object({
            nombre: Yup.string()
                .min(3, 'Las habitaciones deben tener al menos 3 caracteres')
                .required('El nombre de la habitacion es obligatorio'),

            precio: Yup.number()
                .min(1, 'Debes agregar un numero')
                .required('El precio de la habitacion es obligatorio'),


            categoria: Yup.string()
                .required('La categoria de la habitacion es obligatorio'),


            descripcion: Yup.string()
                .min(10, 'La descripcion debe ser mas larga')
                .required('La descripcion de la habitacion es obligatorio'),

        }),
        

    
        onSubmit: habitacion => {
            try {
                habitacion.existencia = true;
                habitacion.imagen = urlimagen;
                firebase.db.collection('productos').doc(idHabitacion).update(habitacion);

                //Redireccionar 
                navigate('/Habitaciones')
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
            .ref("productos")
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nombre">Nombre</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="nombre"
                                type="text"
                                placeholder="Nombre habitacion"
                                value={formik.values.nombre}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>
                        {formik.touched.nombre && formik.errors.nombre ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert" >
                                <p>{formik.errors.nombre}</p>
                            </div>
                        ) : null}


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="precio">Precio</label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
                                type="number"
                                placeholder="Nombre $20"
                                min="0"
                                value={formik.values.precio}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                        </div>

                        {formik.touched.precio && formik.errors.precio ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert" >
                                <p>{formik.errors.precio}</p>
                            </div>
                        ) : null}


                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="imagen">Imagen/</label>
                            <FileUploader
                                accept="image/*"
                                id="imagen"
                                name="imagen"
                                randomizeFilename
                                storageRef={firebase.storage.ref("productos")}
                                onUploadStart={handleUploadStart}
                                onUploadError={handleUploadError}
                                onUploadSuccess={handleUploadSuccess}
                                onProgress={handleProgress}
                            />
                        </div>

                        {subiendo && (
                            <div className="h-12 relative w-full border">
                                <div className="bg-green-500 absolute left-0 top-0 text-white px-2 text-sm h-12 flex items-center" style={{ width: '${progreso}%' }}>
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="categoria">Categoria</label>
                            <select
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="precio"
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
                        {formik.touched.categoria && formik.errors.categoria ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert" >
                                <p>{formik.errors.categoria}</p>
                            </div>
                        ) : null}

                        <div className="mb-4">
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

                        {formik.touched.descripcion && formik.errors.descripcion ? (
                            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-5" role="alert" >
                                <p>{formik.errors.descripcion}</p>
                            </div>
                        ) : null}

                        <input
                            type="submit"
                            className="bg-blue-800 hover:bg-blue-900 w-full mt-5 p-2 text-white uppercase font-bold"
                            value="Actualizar"
                        />

                    </form>
                </div>
            </div>
        </>
    );
}

export default EditRoom;