import Swal from 'sweetalert2'



import { NotesAppBar } from "../components/notes/NotesAppBar"
import { db } from "../firebase/firebase-config"
import { fileUpload } from '../helpers/fileUpload';
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types"



// Action para agregar una nueva nota
export const startNewNote = () => {

    // Tarea asíncrona. Nos da el dispatch de Thunk, y además el getState que es como el useSelector
    // Vamos a trabajarlo con async para que espere la respuesta de firebase
    return async ( dispatch, getState ) => {

        // Extraemos el state del store
        // const state = getState();

        // Extraemos solo lo que nos interesa del state
        // Se puede hacer sin necesidad de desestructurar
        const uid = getState().auth.uid
            
        // Creamos una nueva nota como un objeto de javascript
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        // Importamos la db de firebase que hemos configurado en nuestro archivo firebase-config
        // Le decimos donde tiene que almacenar la nota y es una promesa
        const doc = await db.collection(`${ uid }/journal/notes`).add( newNote );

        // Hacemos el dispatch de la nota que acabamos de recibir
        // El id nos viene de Firestore, y la nota ya la tenemos
        dispatch( activeNote( doc.id, newNote ));

        // Hacemos el dispatch para añadir la nota al store y que se redibuje con las demás
        // Le pasamos el id y la nota
        dispatch( addNewNote( doc.id, newNote ));

    };
    
};

// Vamos a devolver un objeto, de ahí que se pongan los ()
// action para almacenar los datos de nota activa
// Devolvemos el id, y usamos el operador spread para incorporar toda la nota
export const activeNote = ( id, note ) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note,
    }
});

// Action para añadir la nueva note al store
export const addNewNote = ( id, note ) => ({
    type: types.notesAddNew,
    payload: {
        id, ...note
    }
})

// Action para cargar las notas en el Store
export const startLoadingNotes = ( uid ) => {

    // Retornamos una función usando el dipatch de Thunk, para cargar las notas en el store
    // Hacemos el return async para poder usar el await en la carga de notas
    return async ( dispatch ) => {

        // Como ya tenemos el uid lanzamos la carga de las notas del usuario
        // Nos devuelve un array
        const notes = await loadNotes( uid );

        // Hacemos del dispatch de las notas al store
        dispatch( setNotes( notes ) )

    }
}

// Action para almacenar las notas del usuario
export const setNotes = ( notes ) => ({
    type: types.notesLoad,
    payload: notes,
})

// Action para guardar los cambios en una nota
export const startSaveNote = ( note ) => {

    // Devolvemos un callback que tiene el dispatch y el getState gracias a Thunk
    // Como nos vamos a comunicar con Firestore, va a ser tarea asíncrona
    return async ( dispatch, getState ) => {

        // Extraemos el state del store, pero solo el auth, y le desestructuramos el uid
        const { uid } = getState().auth;

        // Si no tenemos el url en la nota, borramos esa propiedad
        // Si no, se enviaría un undefined a Firestore y nos daría error
        if (!note.url){
            delete note.url
        }

        // Creamos una nueva variable con toda la información de la nota
        const noteToFirestore = { ...note };
        // Le quitamos el id al nuevo objeto ya que no lo almacenamos, tiene ya su id definido
        delete noteToFirestore.id;

        // Le decimos a la db la dirección del documento, y la orden update con el objeto a actualizar
        await db.doc(`${ uid }/journal/notes/${ note.id }`).update( noteToFirestore);

        // Hacemos el dispatch de la action para actualizar la nota en el Store
        dispatch( refreshNote( note.id, noteToFirestore ));

        // Cuando se terminaron de guardar todos los cambios, lanzamos una sweet alert
        Swal.fire('Saved', note.title, 'success' );

    }
}

// Creamos una nueva action para actualizar los datos de la nota cambiada en el Store
// y así no hay que andar descargando todos los datos nuevamente
export const refreshNote = ( id, note ) => ({
    type: types.notesUpdate,
    payload: {
        id, 
        note: {
            id, // le incorporamos el id a la nota para que no de errores de key
            ...note
        }
    }
})

// Action para subir una imagen a Cloudinary, es una tarea asíncrona
export const startUploading = ( file ) => {

    // Devolvemos una función con el dispatch que nos proporciona Thunk
    // Lo convertimos en async para poder usar el await
    return async ( dispatch, getState ) => {

        // Extraemos la nota activa del Store, y la llamamos activeNote
        const { active:activeNote } = getState().notes;

        // Lanzamos una alerta Swal para mostrar que está cargando la imagen
        Swal.fire({
            title: 'Uploading....',
            text: 'Please Wait....',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () => {
                Swal.showLoading();
            }
        })

        // Lanzamos la carga del archivo y esperamos que termine
        const fileUrl = await fileUpload( file );

        // Modificamos la url a actvieNote
        activeNote.url = fileUrl;

        // Hacemos el dispatch para actualizar la nota
        dispatch( startSaveNote( activeNote ) );

        // Una vez terminó la carga, cerramos la alerta Swal
        Swal.close();

    }

}

// Action para lanzar una petición de borrado de una nota a Firestore
export const startDeleting = ( id ) => {

    // Return de un callback que le pasamos el dispatch y el getState que nos da Thunk
    return async ( dispatch, getState ) => {

        // obtenemos el id del usuario del Store
        const uid = getState().auth.uid;

        // Lanzamos la petición de borrado a Firestore con el id de la nota que hay que borrar
        await db.doc( `${ uid }/journal/notes/${ id }` ).delete();
        
        // Hacemos el dispatch de la action de borrado de la nota
        dispatch( deleteNote( id ) );
        
    }

}

// Creamos un action para borrar la nota del store, cuyo payload es el id
export const deleteNote = ( id ) => ({
    type: types.notesDelete,
    payload: id,   
})

// Creamos un action para vaciar del store las notas el usuario cuando salga
export const noteLogout = () => ({
    type: types.notesLogoutCleaning,
})