import React,{useEffect, useState, useContext}from 'react';
import { FirebaseContext } from '../../firebase';
import Reserva from '../ui/Reserva';

const Reservas = () => {

    // context con las operaciones de firebase

    const {firebase} = useContext(FirebaseContext);
    
    const [usuarios, guardarUsuarios] = useState([]);
    

    useEffect(() =>{
         
        const obtenerUsuarios = () => {
            firebase.db.collection('usuarios').onSnapshot(manejarSnapshot2);
        }
        obtenerUsuarios();
    }, []);

    function manejarSnapshot2(snapshot) {
        const usuarios = snapshot.docs.map(doc => {
            return {
               id: doc.id,
               ...doc.data() 
            }
            
        });
        guardarUsuarios(usuarios);
            
    }

   
    return (
        <>
            <h1 className="text-3xl font-light mb-4">Reservas</h1>
            <div className="w-full px-3 mb-4">
                {usuarios.map(usuario =>(
                    <Reserva
                        key={usuario.id}
                        habitacion={usuario}
                    />
                ))}
            </div>
        </>
    );
}

export default Reservas;