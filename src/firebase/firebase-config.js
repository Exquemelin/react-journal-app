// Realizamos varias importaciones de Firebase que necesitaremos
import firebase from "firebase/app";
import 'firebase/firestore'
import 'firebase/auth'


// Esta es la configuración de nuestra aplicación en firebase, sacado del SDK
const firebaseConfig = {
  apiKey: "AIzaSyDdcK-lxlL6A2zZfllCcoLb8ZeRDQ5IcH8",
  authDomain: "react-app-cursos-48b7f.firebaseapp.com",
  projectId: "react-app-cursos-48b7f",
  storageBucket: "react-app-cursos-48b7f.appspot.com",
  messagingSenderId: "877572688314",
  appId: "1:877572688314:web:98b83e10854f48ec5a3583"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Configuramos la base de datos de firestore que utilizaremos para almacenar datos
const db = firebase.firestore();

// Variable para realizar autenticaciones con Google en Firestore
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

// Marcamos las exportaciones que vamos a necesitar en nuestra App
export {
    db,
    googleAuthProvider,
    firebase
}