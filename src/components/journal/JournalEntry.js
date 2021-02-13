import React from 'react'

export const JournalEntry = () => {

    return (
        <div className="journal__entry">

            <div 
                className="journal__entry-picture"
                style={{ // el style aquí hay que ponerlo completo, coo si fuese css, no como un className
                    backgroundSize: 'cover',
                    backgroundImage: 'url(https://www.wwf.org.uk/sites/default/files/styles/hero_s/public/2019-05/Turtle%20and%20sea%20grass.jpg?h=7e730666&itok=59yknGMI)'
                }}
            >
                
            </div>

            <div className="journal__entry-body" >

                <p className ="journal__entry-title" >
                    Un nuevo día
                </p>

                <p className ="journal__entry-content">
                    Lorem Ipsum akdsjf askdjfaskdfj dfj aslñkdj sad fkljas df asdlkfj asldkas dfkaj 
                </p>

            </div>

            <div className="journal__entry-date-box">
                <span>Monday</span>
                <h4>28</h4>
            </div>
            
        </div>
    )

}
