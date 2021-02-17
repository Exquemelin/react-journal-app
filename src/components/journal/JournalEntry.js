import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';
// import 'moment/locale/es'


export const JournalEntry = ({ id, date, title, body, url}) => {

    // Declaramos una variable dispatch para lanzar acciones
    const dispatch = useDispatch()

    // Improtamos el locale, y establecemos el idioma
    // moment.locale('es);')
    
    // Cargamos en una variable la trasnformación de la fecha con el package moment
    const noteDate = moment(date);

    //Creamos una acción para cuando se haga click encima de una nota
    const handleEntryClick = () => {

        // console.log('click nota' + id)

        // Hacemos el dispatch con los datos de la nota
        dispatch( activeNote( id, {
            date, title, body, url
        }) );

    }

    return (
        <div 
            className="journal__entry animate__animated animate__fadeIn animate__faster" 
            onClick={ handleEntryClick }
        >

            {
                // Si tenemos un url, mostramos la imagen. De lo contrario no hace nada
                url && 
                <div 
                    className="journal__entry-picture"
                    style={{ // el style aquí hay que ponerlo completo, coo si fuese css, no como un className
                        backgroundSize: 'cover',
                        backgroundImage: `url(${ url })`
                    }}
                >
                </div>
            }
                

            <div className="journal__entry-body" >

                <p className ="journal__entry-title" >
                    { title }
                </p>

                <p className ="journal__entry-content">
                    { body }
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>{ noteDate.format('dddd')}</span>
                <h4>{ noteDate.format('Do')}</h4>
            </div>
            
        </div>
    )

}
