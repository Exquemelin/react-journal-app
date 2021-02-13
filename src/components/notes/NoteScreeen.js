import React from 'react'
import { NotesAppBar } from './NotesAppBar'


export const NoteScreeen = () => {

    return (

        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                />

                <textarea
                    placeholder="What happened today"
                    className="notes__textarea"
                ></textarea>

                <div className="notes__image">
                    <img 
                        src="https://images.pexels.com/photos/2127969/pexels-photo-2127969.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
                        alt="imagen"
                    />
                </div>

            </div>

        </div>

    )

}
