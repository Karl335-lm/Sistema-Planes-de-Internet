# t3_act8_eqXX - Sistema de Planes de Internet

## Integrantes
- [Tu nombre completo] - Fases 1, 2 y 4
- [Nombre de tu compañera] - Fase 3

# Sistema de Clientes de Internet - t3_act8_eq16

## Integrantes
- Martinez Bautista Karla
- Ruiz Jimenez Erandi Camila


## API elegida
**DummyJSON Users** - https://dummyjson.com/users


Se eligió esta API porque el sistema es de gestión de clientes, y DummyJSON Users
permite simular un directorio de clientes con paginación real (`limit`/`skip`),
búsqueda (`q`) y operaciones CRUD (`POST/PUT/DELETE`).

## Proyecto desplegado
http://IP_DE_TU_VPS/t3_act8_eqXX

## Tecnologías
- React + Vite
- React Router DOM
- Lucide React (iconos)
- DummyJSON (auth + users)

## Instalación local
```bash
npm install
npm run dev

**¿Por qué elegimos esta API?**
Nuestro sistema se trata de una empresa de internet, por lo que necesitábamos gestionar **clientes**, por lo tanto, DummyJSON tiene un endpoint específico de usuarios (`/users`) que nos vino perfecto. Nos permitió adaptar los campos (como `firstName` y `lastName` a "Nombre", o `address.city` a "Colonia") para que todo cuadrara con nuestro diseño. Además, nos daba las herramientas justas que se nos solicitaba: nos dejó simular el inicio de sesión (auth), nos permitió hacer la paginación real de la tabla (usando límites y saltos), la búsqueda por texto, y nos dejó practicar las peticiones `POST`, `PUT` y `DELETE` para el CRUD.

## Proyecto desplegado en AWS
El proyecto se encuentra desplegado en una instancia EC2 de Amazon Web Services.
**Enlace:** http://18.218.44.223/t3_act8_eq16/

## Tecnologías utilizadas
- React + Vite
- React Router DOM (para el manejo de rutas y la URL con la paginación)
- Lucide React (iconos)
- DummyJSON (API de autenticación y datos)
- Nginx (Servidor web en AWS EC2)


## Resumen del desarrollo

El diseño (Figma): Todo comenzó con el prototipo desarrollado en la Actividad 7. Se tomó como base esa paleta de colores y la distribución visual (login, menú lateral y la tabla) para maquetar la interfaz en React.

El Login (Fase 1 y 2): Se construyó el formulario y se conectó a la API de autenticación de DummyJSON. Se implementaron validaciones para asegurar que los campos no estuvieran vacíos y, al verificar que el usuario existiera, sus datos (incluida su foto de perfil) se guardaron en el estado global (useState). Posteriormente, se creó el "esqueleto" del sistema con el Sidebar y Navbar, asegurando mediante una condición de estado que, si alguien intentaba ver el sistema sin iniciar sesión, fuera redirigido automáticamente a la pantalla de login.

La Tabla y el CRUD (Fase 3): Esta fue la fase más compleja. La tabla se conectó a la API de usuarios. Se implementaron filtros por texto y por estado, y la paginación se configuró para que se reflejara en la URL (por ejemplo, ?page=2&limit=20), permitiendo que el botón de "atrás" del navegador funcionara correctamente. También se agregaron modales para agregar y editar clientes, incluyendo ventanas de confirmación antes de guardar o borrar, y logrando que la vista se actualizara en tiempo real tras cada operación.

El Despliegue (Fase 4): Finalmente, se creó una máquina virtual (instancia EC2) en AWS con Amazon Linux. Se instaló Nginx y se subió la carpeta de producción (dist) generada por Vite. Se configuró la ruta /t3_act8_eq16/ en el servidor para que todo el sistema funcionara correctamente en la nube.

