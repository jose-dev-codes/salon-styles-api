# API de Gestión de Citas para Salón de Belleza

Este repositorio contiene la estructura del cliente y del servidor para un sistema de gestión de citas de un salón de belleza. La implementación desarrollada en este proyecto corresponde al backend, construido con Node.js, Express y PostgreSQL, el cual expone una API REST para la autenticación de usuarios, la gestión de usuarios y para realizar las operaciones de creación, consulta, actualización y eliminación de citas (CRUD).

## Tecnologías utilizadas

- Node.js
- Express
- PostgreSQL
- pnpm
- dotenv
- bcryptjs
- jsonwebtoken

## Estructura del backend

El backend está organizado en diferentes módulos para separar las responsabilidades de la aplicación.

- `config`: configuración de la conexión con PostgreSQL.
- `models`: operaciones de acceso a los datos almacenados en PostgreSQL.
- `services`: lógica de negocio y validaciones de la aplicación.
- `controllers`: gestión de las peticiones y respuestas HTTP.
- `routes`: definición de las rutas de la API.
- `middlewares`: funciones que intervienen en el procesamiento de las peticiones, como la validación de datos, la autenticación y la verificación de propiedad de los recursos.

El flujo general de una petición es:

`routes → controllers → services → models → PostgreSQL`

## Requisitos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Node.js
- PostgreSQL
- pnpm

## Instalación

1. Abra una terminal y ubíquese en la carpeta `server`:

    cd server

2. Instale las dependencias del proyecto:

    pnpm install

## Configuración

Cree un archivo llamado `.env` dentro de la carpeta `server` con el siguiente contenido:

    PORT=3000
    DB_HOST=localhost
    DB_PORT=5432
    DB_USER=postgres
    DB_PASSWORD=su_contraseña
    DB_NAME=salon_styles
    JWT_SECRET=su_clave_secreta

## Configuración de la base de datos

1. Cree una base de datos en PostgreSQL llamada `salon_styles`.

2. Ejecute el script `salon_styles.sql`, ubicado en la raíz del proyecto, para crear las tablas, las relaciones y los datos de prueba.

## Ejecución del servidor

Desde la carpeta `server`, ejecute el siguiente comando:

    pnpm dev

Si la configuración es correcta, el servidor se iniciará en el puerto definido en el archivo `.env`.

## Autenticación

La API utiliza JWT para autenticar las peticiones protegidas.

El inicio de sesión se realiza mediante:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Valida las credenciales del usuario y genera un token JWT. |

Las contraseñas almacenadas en la base de datos se manejan mediante `bcryptjs`.

Las rutas protegidas requieren autenticación mediante un token JWT enviado en el encabezado:

`Authorization: Bearer <token>`

El middleware de autenticación verifica la validez y expiración del token antes de permitir el acceso a las rutas protegidas.

## Endpoints

### Usuarios

La API expone las siguientes rutas para la gestión de usuarios:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/usuarios/:id` | Obtiene la información de un usuario según su identificador. |
| POST | `/api/usuarios` | Crea un nuevo usuario. |
| PUT | `/api/usuarios/:id` | Actualiza los datos de un usuario según su identificador. |
| PUT | `/api/usuarios/:id/contrasena` | Actualiza la contraseña de un usuario. |
| DELETE | `/api/usuarios/:id` | Elimina un usuario según su identificador. |

### Reglas para los usuarios

Al crear o actualizar un usuario se realizan las siguientes validaciones:

- Los nombres y apellidos deben tener un formato válido y una longitud entre 2 y 50 caracteres.
- Los nombres y apellidos pueden contener letras, espacios y apóstrofes.
- El correo electrónico debe tener un formato válido y una longitud máxima de 100 caracteres.
- El número de teléfono debe contener únicamente números y tener una longitud entre 10 y 15 caracteres.
- La fecha de nacimiento debe utilizar el formato `YYYY-MM-DD`.
- La fecha de nacimiento no puede ser futura.
- El correo electrónico no puede estar registrado previamente por otro usuario.
- Las contraseñas deben tener mínimo 6 caracteres.
- Las contraseñas deben contener mayúsculas, minúsculas, números y caracteres especiales.
- Las contraseñas no pueden contener espacios.
- Las contraseñas se almacenan utilizando `bcryptjs` para generar un hash antes de guardarlas en la base de datos.
- Las operaciones de consulta, actualización, cambio de contraseña y eliminación requieren autenticación.
- Un usuario solo puede acceder, modificar o eliminar sus propios datos.

### Citas

La API expone las siguientes rutas para la gestión de citas:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Obtiene las citas del usuario autenticado. |
| POST | `/api/citas` | Crea una nueva cita para el usuario autenticado. |
| PUT | `/api/citas/:id` | Actualiza una cita existente según su identificador. |
| DELETE | `/api/citas/:id` | Elimina una cita según su identificador. |

### Reglas para las citas

Al crear o actualizar una cita se realizan las siguientes validaciones:

- La fecha de la cita no puede ser anterior a la fecha actual.
- Un especialista no puede tener dos citas en la misma fecha y hora.
- Al crear una cita, el identificador del usuario se obtiene directamente del usuario autenticado mediante el token JWT.
- El identificador del usuario no se recibe desde el cuerpo de la petición al crear una cita.
- Al consultar las citas, únicamente se muestran las citas pertenecientes al usuario autenticado.
- Al actualizar una cita, primero se verifica que la cita indicada exista.
- Al comprobar una posible cita duplicada durante una actualización, la propia cita que se está modificando se excluye de la búsqueda.
- Antes de actualizar o eliminar una cita se verifica que pertenezca al usuario autenticado.
- Un usuario no puede modificar ni eliminar una cita perteneciente a otro usuario.
- Al eliminar una cita, se verifica que el identificador corresponda a una cita existente.
- Las operaciones de creación, actualización y eliminación requieren autenticación.

Las citas nuevas se crean con el estado `pendiente` por defecto.
