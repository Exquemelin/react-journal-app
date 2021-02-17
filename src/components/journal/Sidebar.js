import React from 'react'
import { useDispatch, useSelector } from 'react-redux'


import { JournalEntries } from './JournalEntries'


import { startLogout } from '../../actions/auth';
import { noteLogout, startNewNote } from '../../actions/notes';


export const Sidebar = () => {

    // Definimos la variable dispatch para poder utilizar
    const dispatch = useDispatch();

    // Extraemos del store el nombre del usuario
    const { name } = useSelector( state => state.auth )
    
    // Creamos una función para el botón Logout
    const handleLogout = async () => {

        // Hacemos el dispatch de la función que hará logout en Firebase
        await dispatch( startLogout() );

        // Hacemos el dispatch de la función que vaciará las notas del store
        dispatch( noteLogout() )

    };

    // Creamos una función que sea disparada por el botón añadir nota
    const handleAddNew = () => {

        // Hacemos el dispatch del action para agregar una nueva nota
        dispatch( startNewNote() );
    }

    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> { name } </span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div 
                className="journal__new-entry"
                onClick={ handleAddNew }
            >
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>

            <JournalEntries />
          
        </aside>
    )
}
