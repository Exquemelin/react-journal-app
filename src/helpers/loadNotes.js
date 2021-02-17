import { db } from "../firebase/firebase-config"


// Función para cargar las notas que tiene un usuario
export const loadNotes = async ( uid ) => {

    // Hacemos una petición a la db que ya tenemos configurada en firebase-config
    // Nos devuelve un documento de firebase con todas las notas
    // Es una función asíncrona
    const notesSnap = await db.collection( `${ uid }/journal/notes` ).get();

    // Creamos un objeto vacío en el que almacenaremos las notas
    const notes = [];

    notesSnap.forEach( snapHijo => {
        // console.log( snapHijo.data() )

        // Cargamos cada nota en el array que vamos a devolver
        notes.push({
            id: snapHijo.id,
            ...snapHijo.data(),
        });

    });

    // Devolvemos las notas
    return notes;

}