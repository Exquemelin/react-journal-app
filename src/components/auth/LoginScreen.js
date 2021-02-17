import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { useForm } from '../../hooks/useForm'
import { login, startGoogleLogin, startLoginEmailPassword } from '../../actions/auth'


export const LoginScreen = () => {

    // useDispatch es un hook de react-redux para lanzar los dispatch al store
    // Lo declaramos en una variable para poder usarlo
    const dispatch = useDispatch();

    // Vamos a desestructurar e importar los datos del ui que tenemos en el store
    const { loading } = useSelector( state => state.ui );

    // Creamos una variable para desestructurar el useForm personalizado
    const [ formValues, handleInputChange ] = useForm({
        email: 'lola@gmail.com',
        password: '123456',
    });

    // Extraemos las variables email y password del formValues para poder utilizarlas en el form
    const { email, password } = formValues;

    // Función para gestionar el submit del formulario
    const handleLogin = (e) => {

        // Prevenimos la progación o recarga del formulario
        e.preventDefault();

        // Usamos la variable dispatch para utilizar el hook useDispatch
        dispatch( startLoginEmailPassword( email, password ) );
    }

    // Función para lanzar cuando se haga inicio con Google
    const handleGoogleLogin = () => {

        // Usamos la variable dispatch y usamos el startGoogleLogin de nuestras acciones
        dispatch( startGoogleLogin() );
        
    }

    return (

        <>
            <h3 className="auth__title">Login</h3>
            
            <form 
                onSubmit={ handleLogin }
                className="animate__animated animate__fadeIn animate__faster"
            >

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

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled={ loading }
                >
                    Login
                </button>
                
                <div className="auth__social-networks">

                    <p>- Or -</p>

                    <p className="mt-1">Login with Social Networks</p>

                    <div 
                        className="google-btn"
                        onClick={ handleGoogleLogin }
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Sign in with google</b>
                        </p>
                    </div>

                </div>

                <Link 
                    to="/auth/register"
                    className="link"
                >
                    Create new account
                </Link>
              
            </form>
        </>

    )
}
