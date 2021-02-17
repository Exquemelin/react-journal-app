// ================================================================
//     El store se debe importar en el punto más alto
//     de la aplicación, en este caso el JournalApp
// ================================================================


import { applyMiddleware, combineReducers, compose, createStore } from 'redux'
import thunk from 'redux-thunk';


import { authReducer } from '../reducers/authReducer';
import { notesReducer } from '../reducers/notesReducer';
import { uiReducer } from '../reducers/uiReducer';


// Constante importada de redux devtools para poder utilizar middlewares
// Hay que importar compose de Redux, o dará un error
const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

// Con la función combineReducers unimos varios reducers en uno solo que luego le pasaremos al createStore
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer,
})


// Definimos un createStore. Aunque solo puede recibir un reducer
export const store = createStore(
    reducers,
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    composeEnhancers(
        applyMiddleware( thunk ) // Añadimos el middleware de thunk a Redux
    )
);