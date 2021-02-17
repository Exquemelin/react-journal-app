import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from "validator";


import { useForm } from '../../hooks/useForm';
import { removeError, setError } from '../../actions/ui';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';


export const RegisterScreen = () => {

    // Declaramos el dispatch de useDispatch
    const dispatch = useDispatch();

    // Declaramos una variable state en la que almacenamos el state del store
    // useSelector es un hook de redux que devuelve un callback
    // const state = useSelector( state => state.ui )

    // Declaramos una variable state en la que almacenamos el state del store
    // Vamos a realizar la desestructuración del objeto ui para extraer el error solo
    const { msgError } = useSelector( state => state.ui )
    
    // Preparamos un user para usar en las pruebas
    const user = {
        name: 'Lola',
        email: 'lola@gmail.com',
        password: '123456',
        password2: '123456',
    }

    // Extraemos las variables del useForm
    const [ values, handleInputChange ] = useForm(user);

    // Desestructuramos las variables de values
    const { name, email, password, password2 } = values;

    // Fnción que lanzará al pulsar el botón de register
    const handleRegister = (e) => {

        // Eviamos que se recargue la página
        e.preventDefault();

        // Comprobamos si el formulario es válido y lanzamos el registro
        if ( isFormValid() ) {

            // Hacemos del dispatch de la función de registro
            dispatch( startRegisterWithEmailPasswordName( email, password, name ))

        };

    }

    // Función para comprobar si el formulario es válido, tenemos todos los datos
    const isFormValid = () => {

        // Comprobamos si el campo nombre tiene texto
        if ( name.trim().length <= 0 ) {

            // Hacemos el dispatch del error al store
            dispatch( setError('Name is required') );

            // Devolvemos false si no contiene datos
            return false;

        // usamos el pacakge validator para ver si el email es correct
        } else if ( !validator.isEmail( email ) ) {

            // Hacemos el dispatch del error al store
            dispatch( setError('Email is not valid') );
            
            // Devolvemos false si el email no es correcto
            return false;

        } else if ( password !== password2 || password.length < 6 ) {

            // Hacemos el dispatch del error al store
            dispatch( setError('Password should be at least 6 characters and match each other') );

            // Devolvemos false si los pass no coinciden o tiene menos de 6 caracteres
            return false;

        } else {
            
            // Hacemos el dispatch para quitar cualquier error que haya
            // dispatch( removeError() );
            dispatch( removeError() );

            // Si no hay ningún fallo tenemos que devolver un true
            return true;

        }

    }

    return (

        <>
            <h3 className="auth__title">Register</h3>
            
            <form 
                onSubmit={ handleRegister }
                className="animate__animated animate__fadeIn animate__faster"
            >

                {
                    // Evaluamos el error y lo mostramos si lo hay
                    msgError &&
                    (
                        <div className="auth_alert-error">
                            { msgError }
                        </div>
                    )
                }

                <input 
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value={ name }
                    onChange={ handleInputChange }
                />
                
                <input 
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={ email }
                    onChange={ handleInputChange }
                />

                <input 
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={ password }
                    onChange={ handleInputChange }
                /> 

                <input 
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={ password2 }
                    onChange={ handleInputChange }
                /> 

                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                >
                    Register
                </button>
                

                <Link 
                    to="/auth/login"
                    className="link"
                >
                    Alredy registered?
                </Link>
              
            </form>
        </>

    )
}
