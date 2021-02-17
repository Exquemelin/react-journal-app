import React from 'react'
import { useSelector } from 'react-redux'


import { NoteScreeen } from '../notes/NoteScreeen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'


export const JournalScreen = () => {

    // Extraemos la nota activa del store
    const { active } = useSelector(state => state.notes)

    return (
        <div className="journal__main-content animate__animated animate__fadeIn animate__faster">

            <Sidebar />

            <main>

                {
                    ( active ) 
                        ? ( <NoteScreeen /> )
                        : ( <NothingSelected /> )
                }

                {/* <NothingSelected /> */}

            </main>
            
        </div>
    )

}
