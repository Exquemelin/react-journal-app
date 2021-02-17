

// Este helper lo utilizaremos para realizar la carga física en Cloudinary
export const fileUpload = async ( file ) => {

    // Almacenamos en una variable la URL de carga en Cloudinary
    const cloudUrl = 'https://api.cloudinary.com/v1_1/drnoemuze/image/upload';

    // Creamos una variable del tipo formData para almacenar la información que le tenemos que pasar en la carga
    const formData = new FormData();
    // Añadimos la información necesaria como se probó en Postman
    formData.append('upload_preset', 'react-journal-app');
    formData.append('file', file );

    // Hacemos un try catch para coger los errores que puedan llegar
    try {

        // almacenamos la respuesta y hacemos el fetch a la url, pero le tenemos que decir que es del tipo POST
        // Por defecto es siempre un GET
        const resp = await fetch( cloudUrl, {
            method: 'POST',
            body: formData,
        });

        // Evaluamos si la respuesta vino bien, por lo tanto la carga fue bien
        if ( resp.ok ) {

            // Pasamos por el json la respuesta y la almacenamos en una nueva variable
            const cloudResp = await resp.json();

            // Devolvemos el secure_url que nos fino en la respuesta
            return cloudResp.secure_url;

        } else {

            // Si algo fue mal, lanzamos la respuesta como error
            throw await resp.json();

        }
        
    } catch (error) {

        // Si hubo algún error, lo lanzamos
        throw error;

    }

    // return url de la imagen
}