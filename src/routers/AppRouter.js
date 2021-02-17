import React, { useEffect, useState } from 'react';
import { 
    Route, 
    BrowserRouter as Router, 
    Switch, 
    Redirect} from 'react-router-dom';
import { useDispatch } from 'react-redux';


import { firebase } from "../firebase/firebase-config";
import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';
import { login } from '../actions/auth';
import { PublicRoute } from './PublicRoute';
import { PrivateRoute } from './PrivateRoute';
import { startLoadingNotes } from '../actions/notes';


export const AppRouter = () => {

    // Cremaos la variable dispatch para poder lanzar información al store
    const dispatch = useDispatch();

    // Usamos un useState para comprobar si ya tenemos los datos de si está autenticado o no
    // Como solo se usa en este elemento, vamos a usar useState en lugar de mandarlo al store
    const [checking, setChecking] = useState( true );

    // Creamos otro useState para comprobar si el usuario está autenticado o no
    const [isLoggedIn, setIsLoggedIn] = useState( false );

    // Vamos a usar un useEffect para guardar la información de la autenticación
    useEffect(() => {
        
        // Esto es un observer que se va a lanzar cada vez que cambia el auth
        firebase.auth().onAuthStateChanged( (user) => {

            // Comprobamos primero si tenemos un objeto user con el "?"
            // Si lo tenemos, comprobamos que tenga el uid, es decir que no sea null
            if ( user?.uid ) {

                // Cargamos en el store los datos del usuario
                dispatch( login( user.uid, user.displayName ));

                // Si está autenticado, ponemos el isLoggedIn en true
                setIsLoggedIn( true );

                // Hacemos el dispatch de la carga de notas
                dispatch( startLoadingNotes( user.uid ) )
                
            } else {

                // Si no está autenticado, ponemos el isLoggedIn en false
                setIsLoggedIn( false );
                
            }

            // Una vez terminó de cargar la información del auth, ponemos la variable checking en false
            setChecking( false );

        });

        // Añadimos el setCheking como dependencia también
    }, [ dispatch, setChecking, setIsLoggedIn ]) // Ponemos el dispatch para que no de error, no porque vaya a cambiar nada

    // Si estamos haciendo checking, lanzamos una pantalla de carga
    if ( checking ) {
        return (
            <h1>Wait......</h1> // Mejor cambiar por una página
        )
    } 

    return (
        <Router>
            <div>
                <Switch>

                {/* Router
                    path=/auth
                    No es exact
                    component={ AuthRouter }
                */}
                
                    <PublicRoute 
                        path="/auth"
                        component={ AuthRouter }
                        isLoggedIn={ isLoggedIn }
                    />
                    
                    <PrivateRoute 
                        exact
                        path="/"
                        component={ JournalScreen }
                        isLoggedIn={ isLoggedIn }
                    />
                
                    {/* <Route exact path="/" component={ JournalScreen } /> */}
                    {/* <AuthRouter path="/auth" /> */}

                    {/* <Route
                        path="/auth"
                        component={ AuthRouter }
                    /> */}

                    <Redirect
                     to='/auth/login' />


                {/* 
                    Main Route
                    exact
                    path="/"
                    componente={ JournalScreen }
                */}
                    

                </Switch>
            </div>
        </Router>
        
    )
}
