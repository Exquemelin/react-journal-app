import { types } from "../types/types";

/*
    ==== Objeto que va a manejar el reducer ====
    {
        uid: jkjaksdjflaskjio1387u
        name: 'Iván'
    }

*/

// El reducer es una función que recibe dos argumento, el state y el action
// Inicializamos el state aunque sea en vacío, si no, dará error en redux
export const authReducer = ( state = {}, action ) => {

    // Establecemos el switch del reducer
    switch ( action.type ) {

        case types.login:
            
            // Si nos viene un login devolvemos un objeto con el id y el name
            return {
                uid: action.payload.uid,
                name: action.payload.displayName
            };

        case types.logout:

            // Si viene un logout, devolvemos un objeto vacio
            return { }
    
        default:

            // Por defecto devolvemos el state directamente
            return state;

    }

}