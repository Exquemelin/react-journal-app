import React from 'react'
import { useSelector } from 'react-redux';


import { JournalEntry } from './JournalEntry';


// Componente para mostrar el listado de notas en el Sidebar
export const JournalEntries = () => {

    // Cargamos la información de las notas que tenemos en el Store
    const { notes } = useSelector(state => state.notes)

    return (

        <div className="journal__entries">
            
            {
                notes.map( note => (
                    <JournalEntry 
                        key={ note.id } 
                        { ...note }
                    />
                ))
            }

        </div>

    )
}
