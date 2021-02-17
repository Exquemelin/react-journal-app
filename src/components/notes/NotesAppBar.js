import React, {  } from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { startSaveNote, startUploading } from '../../actions/notes'


export const NotesAppBar = () => {

    // Declaramos el dispatch para poder lanzar acciones
    const dispatch = useDispatch();

    // Extraemos los datos de la nota activa del store
    const { active } = useSelector(state => state.notes);

    // Creamos una función que lanzará el botón Save del Appbar
    const handleSave = () => {

        // Hacemos el dispatch para guardar la nota actual
        dispatch( startSaveNote( active ) );
        
    };

    // Creamos una función que lanzará el botón picture
    const handlePictureClick = () => {

        // Seleccionamos el input llamado fileSelector y le hacemos click
        document.querySelector('#fileSelector').click();

    }

    const handleFileChange = (e) => {

        console.log(e.target.files)

        // Almacenamos en una variable la primera imagen del array que nos devuelve la expresión e
        const file = e.target.files[0]

        // Si tenemos un archivo hacemos el dispatch de la carga en Cloudinary
        if ( file ) {

            // Hacemos el dispatch de la función de carga
            dispatch( startUploading( file ) );
        } 

    }

    return (

        <div className="notes__appbar">

            <span>12 de Febrero de 2021</span>

            {/* Usamos un input del tipo file, que nos abrirá un buscador de nuestro disco duro para seleccionar un archivo */}
            <input
                id="fileSelector"
                type="file"
                style={{ display: 'none' }}
                onChange={ handleFileChange }
            />

            <div>
                <button 
                    className="btn"
                    onClick={ handlePictureClick }
                >
                    Picture
                </button>

                <button 
                    className="btn"
                    onClick={ handleSave }
                >
                    Save
                </button>
            </div>
            
        </div>



    )

}
