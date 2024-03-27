# TaskManagementCompanyXY

Desarrollo de una aplicación destinada a la gestión de tareas para los empleados de la empresa "XY". Esta herramienta facilitará la organización y seguimiento de las actividades asignadas a través de la definición de títulos y descripciones para cada tarea. Cada tarea estará asociada a un empleado en particular y podrá transitar por distintos estados, como Pendiente, En proceso, Bloqueado o Completado. Además, se permitirá la interacción mediante comentarios y la posibilidad de adjuntar archivos en diversos formatos, como PDF, JPG, JPEG o PNG.

## Tecnologías

PHP - Laravel - VueJS - MySQL - Tailwind - TypeScript - Javascript

### Versiones Utilizadas

- Laravel Framework: 8.83.27
- Vue.js: 3.2.13
- Vue Router: 4.0.3
- Vuex: 4.0.0
- Core-js: 3.8.3

#### Autenticación

La autenticación en esta aplicación se maneja a través de cookies. Cuando un usuario inicia sesión, se genera un token de autenticación que se almacena en una cookie llamada `jwt`. Este token se utiliza para autenticar las solicitudes del cliente al servidor. Si el token es válido, el usuario está autenticado y puede acceder a recursos protegidos.

Es importante tener en cuenta que aunque se está utilizando una cookie llamada `jwt`, no se está configurando explícitamente JWT (JSON Web Tokens) o Sanctum para la autenticación. Laravel maneja la autenticación a través de cookies de manera predeterminada, pero es posible que se esté utilizando JWT internamente para generar y validar los tokens de autenticación.

### Migraciones de Base de Datos

Este proyecto utiliza migraciones de base de datos de Laravel para definir y gestionar la estructura de la base de datos. Las migraciones son archivos de PHP ubicados en el directorio `database/migrations` que definen los cambios en la estructura de la base de datos de manera programática.

Para ejecutar las migraciones y aplicar los cambios en la base de datos, puedes utilizar el siguiente comando:

```bash
php artisan migrate
```

Para levantar el servidor en el backend y en el frontend, sigue estos pasos:

1. Instala las dependencias de PHP ejecutando `composer install`.
2. Instala las dependencias de JavaScript ejecutando `npm install`.
3. Configura tu archivo `.env`.
4. Ejecuta las migraciones de la base de datos y los seeders con `php artisan migrate --seed`.
5. Inicia el servidor PHP con `php artisan serve`.
6. Compila los assets de Vue.js con `npm run dev`.
7. ¡Listo para comenzar!
