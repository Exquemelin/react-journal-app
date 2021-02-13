import React from 'react'
import { NoteScreeen } from '../notes/NoteScreeen'
import { NothingSelected } from './NothingSelected'
import { Sidebar } from './Sidebar'


export const JournalScreen = () => {

    return (
        <div className="journal__main-content">

            <Sidebar />

            <main>

                {/* <NothingSelected /> */}
                <NoteScreeen />

            </main>
            
        </div>
    )

}
