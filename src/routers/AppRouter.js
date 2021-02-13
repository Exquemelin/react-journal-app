import React from 'react';
import { 
    Route, 
    BrowserRouter as Router, 
    Switch, 
    Redirect} from 'react-router-dom';


import { AuthRouter } from './AuthRouter';
import { JournalScreen } from '../components/journal/JournalScreen';


export const AppRouter = () => {

    return (
        <Router>
            <div>
                <Switch>

                {/* Router
                    path=/auth
                    No es exact
                    component={ AuthRouter }
                */}
                    <Route exact path="/" component={ JournalScreen } />
                    {/* <AuthRouter path="/auth" /> */}
                    <Route
                        path="/auth"
                        component={ AuthRouter }
                    />

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
