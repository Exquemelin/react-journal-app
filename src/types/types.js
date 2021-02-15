
// Función para exportar los diferentes types que va a tener el proyecto
// De esta manera nos aseguramos de estar utilizando siempre los mismos sin errores
export const types = {

    // Vamos creando los diferentes tipos
    login:  '[Auth] Login',
    logout: '[Auth] Logout',

    // Creamos types para el uiRedicer y el error
    uiSetError:     '[UI] Set Error',
    uiRemoveError:  '[UI] Remove Error',
    uiStartLoading: '[UI] Start Loading',
    uiFinisLoading: '[UI] Finish Loading',

}