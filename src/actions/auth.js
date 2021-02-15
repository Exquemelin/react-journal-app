import Swal from 'sweetalert2';

import { useDispatch } from "react-redux";
import { db, googleAuthProvider, firebase } from "../firebase/firebase-config";
import { types } from "../types/types"
import { finishLoading, startLoading } from "./ui";


// Función asíncrona para el login
export const startLoginEmailPassword = ( email, password ) => {

    
    // Devolvemos un callback, es decir una función
    // Le pasamos el dispatch para definirlo en el callback ofrecido por Thunk
    return (dispatch) => {

        // Comenzamos la carga y ponemos el loading del ui en el store en true
        dispatch( startLoading() );

        // Hacemos la autenticación del firebase con el email y el passwrod
        firebase.auth().signInWithEmailAndPassword( email, password )
            .then( ({user}) => { // Tenemos que desestructurar el user de la respuesta

                // El user que nos devuelve lo pasamos al dispatch
                dispatch( login( user.uid, user.displayName ));

                // Ponemos el loading del ui en false
                dispatch( finishLoading() );
                
            })
            .catch( (e) => {

                // Capturamos el error si es que lo hay
                console.log( e );

                // Ponemos el loading del ui en false
                dispatch( finishLoading() );

                // Disparamos un mensaje de error con Sweet Alert 2
                Swal.fire('Error', e.message, 'error')

            });

    }

}

// Función para crear un nuevo usuario en la base de datos de Firebase
export const startRegisterWithEmailPasswordName = ( email, password, name ) => {

    // Esta función devuelve un callback, y establecemos el dispatch que nos ofrece Thunk
    return (dispatch ) => {

        firebase.auth().createUserWithEmailAndPassword( email, password )
            .then( async ({ user }) => {

                // Hacemos una actualización del usuario para guardar su nombre, ya que el register no lo puede hacer
                // Usamos un await para esperar que termine antes de continuar, de ahí el async del callback
                await user.updateProfile({ displayName: name });

                // Hacemos el dispatch del login con los datos del user
                dispatch(
                    login( user.uid, user.displayName )
                );

            })
            .catch( e => {

                // Capturamos el error para lanzarlo a la consola
                console.log( e )

                // Disparamos un mensaje de error con Sweet Alert 2
                Swal.fire('Error', e.message, 'error')
                
            });

    }

}

// Función asíncrona para el login mediante autenticación de Google
export const startGoogleLogin = () => {

    // Retornamos un callback, en el cual establecemos del dispatch que nos ofrece Thunk
    return (dispatch) => {

        // Llamamos al firebase, que nos devolverá una promesa
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => { // Extraemos el user de la info que nos llega
                // Lanzamos el dispatch del login con la información del user
                dispatch(
                    login( user.uid, user.displayName )
                )
            })

    }
    
}

// Función que constituirá el "action" del login para hacer el dispatch
// export const login = ( uid, displayName ) => {

//     return{
//         type: types.login,
//         payload: {
//             uid,
//             displayName
//         }
//     }

// }
// Como solo devuelve un solo objeto, podemos hacerlo sin el return con paréntesis
export const login = ( uid, displayName ) => ({
        type: types.login,
        payload: {
            uid,
            displayName
        }
})

// Creamos un action para lanzar el logout a Firebase
export const startLogout = () => {

    // Devolvemos una promesa, es un método asíncrono porque hay que esperar respuesta de Firebase
    return async ( dispatch ) => {
        
        // Lanzamos la orden a Firebase
        await firebase.auth().signOut()

        // Hacemos el dispatch con el action del logout
        dispatch( logout() );

    }

}

// Creamos el action para el logout efectivo. Devolvemos un objeto con el type
export const logout = () => ({
    type: types.logout 
})