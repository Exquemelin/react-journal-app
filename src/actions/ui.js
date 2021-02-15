import { types } from "../types/types"


// Definimos el action que aplicará el error
export const setError = ( err ) => ({
    type: types.uiSetError,
    payload: err,
});

// Definimos el action que quitará el error
export const removeError = () => ({
    type: types.uiRemoveError,
})

// Definimos el action que pondrá el loading en true
export const startLoading = () => ({
    type: types.uiStartLoading,
})

// Definimos el action que pondrá el loading en false
export const finishLoading = () => ({
    type: types.uiFinisLoading,
})