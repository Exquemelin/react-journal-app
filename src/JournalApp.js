import React from 'react';
import { Provider } from 'react-redux';

import { AppRouter } from './routers/AppRouter';
import { store } from './store/store';




export const JournalApp = () => {
    
    // Asignamos el Provider para controlar el AppRouter, y le pasamos nuestro store
    return (
        <Provider store={ store }>
            <AppRouter />
        </Provider>
    )
}
