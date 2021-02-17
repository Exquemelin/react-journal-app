import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes'
import { useForm } from '../../hooks/useForm'


import { NotesAppBar } from './NotesAppBar'


export const NoteScreeen = () => {

    // Declaramos una variable con el dispatch
    const dispatch = useDispatch();

    // Obtenemos la nota activa del Store, y la renombramos a note
    // de ahí active:note
    const { active:note } = useSelector(state => state.notes);

    // Usamos el hook useForm para gestionar el formulario y obtener los datos en formValues
    const [ formValues, handleInputChange, reset ] = useForm( note );

    // Almacenamos la variable mutable que no redibuja todo el componente si cambia
    const activeId = useRef( note.id );

    // Usamos un useEffect para relanzar el useForm cada vez que cambiamos de nota y tome los datos correctos
    useEffect(() => {
        
        // Miramos si el note.id es diferente al activeId.current
        if ( note.id !== activeId.current ) {

            // Usamos el reset del useForm para pasarle la nueva nota
            reset( note );

            // Almacenamos el nuevo ide en el useRef para evitar que entre en bucle y poder usarlo de nuevo más adelante
            activeId.current = note.id;

        }
       
    }, [ note, reset ]); // Ponemos como dependencias el note y el reset que los usamos dentro

    // Usamos un useEffect para controlar cuando haya cambios y se dispare el formValues
    useEffect(() => {
        
        // Hacemos el dispatch para la nota activa y actualizar sus datos
        dispatch( activeNote( formValues.id, { ...formValues } ) )
       
    }, [ formValues, dispatch]) // Ponemos como dependencias el formValues y el dispatch que usamos dentro
    
    // Desestructuramos y sacamos el body y el title
    const { body, title } = formValues;

    // Declaramos una función que disparará el botón de borrado de nota
    const handleDelete = () => {

        // Hacemos el distpatch de la función que hará el borrado de la nota
        dispatch( startDeleting( note.id ) );

    }

    return (

        <div className="notes__main-content">
            
            <NotesAppBar />

            <div className="notes__content">

                <input 
                    type="text"
                    name="title"
                    placeholder="Some awesome title"
                    className="notes__title-input"
                    autoComplete="off"
                    value={ title }
                    onChange={ handleInputChange }
                    />

                <textarea
                    placeholder="What happened today"
                    name="body"
                    className="notes__textarea"
                    value={ body }
                    onChange={ handleInputChange }
                    ></textarea>

                {
                    (note.url)
                    && (
                        <div className="notes__image">
                            <img 
                                src={ note.url }
                                alt="imagen"
                                />
                        </div>
                    )
                }
                
            </div>

            <div>
                <button
                    className="btn btn-danger"
                    onClick={ handleDelete }
                >
                    Delete
                </button>
            </div>

        </div>

    )

}
