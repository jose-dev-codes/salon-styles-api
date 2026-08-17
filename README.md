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

## Requisitos

Antes de ejecutar el proyecto, asegúrese de tener instalado:

- Node.js
- PostgreSQL
- pnpm

## Instalación

1. Abra una terminal y ubíquese en la carpeta `server`:

```bash
cd server
```

2. Instale las dependencias del proyecto:

```bash
pnpm install
```

## Configuración

Cree un archivo llamado `.env` dentro de la carpeta `server` con el siguiente contenido:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=su_contraseña
DB_NAME=salon_styles
JWT_SECRET=su_clave_secreta
```

## Configuración de la base de datos

1. Cree una base de datos en PostgreSQL llamada `salon_styles`.

2. Ejecute el script `salon_styles.sql`, ubicado en la raíz del proyecto, para crear las tablas, las relaciones y los datos de prueba.

## Ejecución del servidor

Desde la carpeta `server`, ejecute el siguiente comando:

```bash
pnpm dev
```

Si la configuración es correcta, el servidor se iniciará en el puerto definido en el archivo `.env`.

## Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/auth/login` | Valida las credenciales del usuario y genera un token JWT. |

Las rutas de citas requieren autenticación mediante un token JWT enviado en el encabezado:

`Authorization: Bearer <token>`

La API expone las siguientes rutas para la gestión de citas:

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/citas` | Obtiene todas las citas registradas. |
| POST | `/api/citas` | Crea una nueva cita. |
| PUT | `/api/citas/:id` | Actualiza una cita existente según su identificador. |
| DELETE | `/api/citas/:id` | Elimina una cita según su identificador. |
