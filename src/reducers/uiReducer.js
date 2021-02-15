import { types } from "../types/types";


// Creamos un objeto de inicialización del reducer
const initialState = {
    loading: false,
    msgError: null
}

// Declaramos el reducer
export const uiReducer = ( state = initialState, action ) => {

    // Hacemos el switch con las diferentes acciones. Declaradas en el types para no cometer errores
    switch ( action.type ) {

        case types.uiSetError:
            
            // Si tenemos un error, estableceremos el mensaje de error
            // usamos el spread con el state y modificamos el error
            return {
                ...state,
                msgError: action.payload
            }

        case types.uiRemoveError:

            // Si ya no hay error eliminamos el mensaje
            // usamos el spread con el state y modificamos el error
            return {
                ...state,
                msgError: null
            }

        case types.uiStartLoading:

            // Cuando se empiezan a cargar datos cambiamos el loading
            return {
                ...state,
                loading: true
            }

        case types.uiFinisLoading:

            // Cuando se termina la carga de datos cambiamos el loading
            return {
                ...state,
                loading: false
            }
    
        default:

            return state;
    }


}