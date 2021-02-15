import React from 'react'
import { useDispatch } from 'react-redux'
import { startLogout } from '../../actions/auth';


import { JournalEntries } from './JournalEntries'


export const Sidebar = () => {

    // Definimos la variable dispatch para poder utilizar
    const dispatch = useDispatch();
    
    // Creamos una función para el botón Logout
    const handleLogout = () => {

        // Hacemos el dispatch de la función que hará logout en Firebase
        dispatch( startLogout() );

    };


    return (
        <aside className="journal__sidebar">

            <div className="journal__sidebar-navbar">

                <h3 className="mt-5">
                    <i className="far fa-moon"></i>
                    <span> Iván </span>
                </h3>

                <button 
                    className="btn"
                    onClick={ handleLogout }
                >
                    Logout
                </button>

            </div>

            <div className="journal__new-entry">
                <i className="far fa-calendar-plus fa-5x"></i>
                <p className="mt-5">
                    New Entry
                </p>
            </div>

            <JournalEntries />
          
        </aside>
    )
}
