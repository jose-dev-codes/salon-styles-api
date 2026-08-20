# API de Gestión de Citas para Salón de Belleza

Este repositorio contiene la estructura del cliente y del servidor para un sistema de gestión de citas de un salón de belleza. La implementación desarrollada en este proyecto corresponde al backend, construido con Node.js, Express y PostgreSQL, el cual expone una API REST para la autenticación de usuarios y para realizar las operaciones de creación, consulta, actualización y eliminación de citas (CRUD).

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
- `middlewares`: funciones que intervienen en el procesamiento de las peticiones, como la verificación de autenticación.

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

Las rutas de citas requieren autenticación mediante un token JWT enviado en el encabezado:

`Authorization: Bearer <token>`

El middleware de autenticación verifica la validez y expiración del token antes de permitir el acceso a las rutas protegidas.

## Endpoints

### Citas

La API expone las siguientes rutas para la gestión de citas:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Obtiene todas las citas registradas. |
| POST | `/api/citas` | Crea una nueva cita. |
| PUT | `/api/citas/:id` | Actualiza una cita existente según su identificador. |
| DELETE | `/api/citas/:id` | Elimina una cita según su identificador. |

### Reglas para las citas

Al crear o actualizar una cita se realizan las siguientes validaciones:

- La fecha de la cita no puede ser anterior a la fecha actual.
- Un especialista no puede tener dos citas en la misma fecha y hora.
- Al actualizar una cita, primero se verifica que la cita indicada exista.
- Al comprobar una posible cita duplicada durante una actualización, la propia cita que se está modificando se excluye de la búsqueda.
- Al eliminar una cita, se verifica que el identificador corresponda a una cita existente.
- Las operaciones de creación, actualización y eliminación requieren autenticación.

Las citas nuevas se crean con el estado `pendiente` por defecto.
