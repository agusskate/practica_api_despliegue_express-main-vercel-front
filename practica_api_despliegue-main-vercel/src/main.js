$(document).ready(function () {
    // URL del servidor Express
    const API_URL_USER1 = 'https://practica-api-despliegue-express-main-vercel.vercel.app/users/user1/';
    const API_URL_ALL_USERS = 'https://practica-api-despliegue-express-main-vercel.vercel.app/users';
    const API_URL_USER = 'https://practica-api-despliegue-express-main-vercel.vercel.app/users';
    const API_URL_USER_FORM = 'https://practica-api-despliegue-express-main-vercel.vercel.app/users/';

    //ocultar formulario
    $('.contenedorFormulario').hide();

    // Evento al hacer clic en el botón de imprimir el primer usuario
    $('.botonSacarPrimero button').on('click', function () {
        $('.contenedorTarjetas .card').remove();
        // Verifica si la tarjeta del primer usuario ya ha sido añadida
        if ($('.contenedorTarjetas .card').length === 0) {
            // Realiza la petición AJAX
            $.ajax({
                url: API_URL_USER1,
                method: 'GET',
                success: function (user) {
                    console.log('Usuario recibido:', user);
                    // Llama a la función para crear la tarjeta
                    addCard(user, "user1");
                },
                error: function (error) {
                    console.error('Error al obtener el usuario:', error);
                }
            });
        } else {
            console.log('La tarjeta del primer usuario ya ha sido agregada.');
        }
    });

    // Evento al hacer clic en el botón de imprimir todos los usuarios
    $('.botonSacarTodos button').on('click', function () {
        // Elimina todas las tarjetas previas
        $('.contenedorTarjetas .card').remove();

        // Realiza la petición AJAX para obtener todos los usuarios
        $.ajax({
            url: API_URL_ALL_USERS,
            method: 'GET',
            success: function (users) {
                console.log('Usuarios recibidos:', users);
                // Llama a la función para crear una tarjeta para cada usuario
                users.forEach(user => {
                    addCard(user, `user${user.id}`);
                });
            },
            error: function (error) {
                console.error('Error al obtener los usuarios:', error);
            }
        });
    });

    // Evento al hacer clic en el botón de imprimir un usuario específico
    $('.botonEnviarId button').on('click', function () {
        const userId = String($('.inputBuscar input').val());  // Obtener la ID del input

        if (userId) {  // Solo si hay ID
            // Elimina todas las tarjetas previas
            $('.contenedorTarjetas .card').remove();

            // Realiza la petición AJAX para obtener el usuario con la ID proporcionada
            $.ajax({
                url: API_URL_USER + "/" + userId,  // Usar la ID en la URL
                method: 'GET',
                success: function (user) {
                    // Llama a la función para crear la tarjeta
                    addCard(user);
                },
                error: function () {
                    alert('No se encontró el usuario con esa ID.');
                }
            });
        } else {
            alert('Por favor, ingresa una ID.');
        }
    });

    //añadir un nuevo usuario
    $('.anhadirNuevo').on('click', function () {  
        $('.contenedorFormulario').show();
        
        //Enviar los datos del nuevo user
        $('#formularioUsuario').off('submit').on('submit', function(event) {
            event.preventDefault();



            const nombre = $('#nombre').val();
            const apellido = $('#apellido').val();
            const tlfn = $('#telefono').val();
            alert(tlfn);

            $.ajax({
                url: API_URL_USER_FORM,
                method: 'POST',
                contentType: 'application/json',
                data: JSON.stringify({nombre,apellido,tlfn}),
                success: function(response) {
                    alert('Usuario añadido: ' + response.user.nombre);
                    $('.contenedorFormulario').hide();
                },
                error: function (xhr) {
                    alert('Error' + xhr.responseJSON.Error);
                }
            })
        })
    })

    // Función para crear y añadir una tarjeta
    function addCard(user, userId) {
        const cardHtml = `
            <div class="card" data-id="${userId}">
                <div class="face face1">
                    <div class="content">
                        <img src="./user.png" alt="User Image">
                        <h3>${user.nombre}</h3>
                    </div>
                </div>
                <div class="face face2">
                    <div class="content">
                        <div class="apellidos">Apellidos: ${user.apellido || 'No disponible'}</div>
                        <div class="telefono">Teléfono: ${user.tlfn || 'No disponible'}</div>
                    </div>
                </div>
            </div>
        `;
        // Añade la tarjeta al contenedor
        $('.contenedorTarjetas .container').append(cardHtml);
    }
});
