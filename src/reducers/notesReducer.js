import { types } from "../types/types";


// Declaramos el estado inicial, con un array vacío, y sin nota activa
const initialState = {
    notes: [],
    active: null,
}

export const notesReducer = ( state = initialState, action ) => {


    switch (action.type) {

        case types.notesActive:

            // Devolvemos el estado con el operador spread, para tener siempre el anterior
            // Y el active lo cambiamos por la nota que nos llega en el payload
            // Lo desestructuramos con el spread, que es lo convencional
            return{
                ...state,
                active: {
                    ...action.payload
                }
            }

        case types.notesAddNew:

            // Devolvemos el estado con el operador spread
            // Hacemos un nuevo array con la nota que nos llega por el payload y el resto de notas
            return {
                ...state,
                notes: [ action.payload, ...state.notes ]
            }

        case types.notesLoad:

            // Almacenamos las notas que nos llegan en el payload en el store
            return {
                ...state,
                notes: [ ...action.payload ]
            }

        case types.notesUpdate:

            // Hacemos el return del estado, y las notas las pasamos por un punto .map
            // Cuando llegue la nota cuya id coincida la que llega en el action, la cambiamos poer esta
            // En caso contrario dejamos la nota como está
            return {
                ...state,
                notes: state.notes.map(
                    note => note.id === action.payload.id 
                        ? action.payload.note
                        : note
                )
            }

        case types.notesDelete:

            // Realizamos varias tareas
            // Extraemos el state del store
            // Eliminamos la nota activa, la ponemos en null
            // Devolvemos todas las notas que no sea la que vamos a borrar, nos viene el id en el payload
            return {
                ...state,
                active: null,
                notes: state.notes.filter( note => note.id !== action.payload )
            }

        case types.notesLogoutCleaning:

            // Realizamos varias tareas
            // Extraemos el state del store
            // Modificamos las notas, poniendo un array vacío en notes, y la active en null
            return {
                ...state,
                notes: [],
                active: null,
            }
    
        default:

            // Por defecto devolemos el state directamente
            return state;
    }

}