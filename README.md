# Sistema de Transporte Estudiantil - Frontend

## Descripción
Este proyecto es una aplicación web desarrollada en Angular que proporciona una interfaz para que los estudiantes puedan visualizar y dar seguimiento en tiempo real a las rutas de transporte estudiantil. La aplicación permite a los estudiantes ver el estado actual de su ruta de transporte, incluyendo las paradas completadas, la parada actual y las paradas pendientes.

## Características Principales
- Autenticación de usuarios mediante código estudiantil
- Visualización de rutas en tiempo real
- Timeline interactivo de paradas
- Actualización automática del estado de la ruta
- Interfaz responsive y amigable

## Estructura del Proyecto

### Componentes Principales

#### Login Component (`src/app/views/login/`)
- `login.component.ts`: Maneja la lógica de autenticación y validación del formulario de inicio de sesión. Implementa la autenticación mediante código estudiantil y redirige al home tras un login exitoso.
- `login.component.html`: Template del formulario de login con diseño responsive. Incluye campos para código estudiantil y contraseña.
- `login.component.css`: Estilos específicos del componente login, incluyendo animaciones y diseño responsive.

#### Home Component (`src/app/views/home/`)
- `home.component.ts`: Gestiona la visualización de la información del usuario y el timeline de la ruta. Implementa actualizaciones en tiempo real del estado de la ruta.
- `home.component.html`: Template que muestra el estado de la ruta y la información del usuario, incluyendo el timeline interactivo.
- `home.component.css`: Estilos para el timeline y la disposición de elementos, con animaciones para los estados de las paradas.

### Servicios

#### Auth Service (`src/app/services/auth.service.ts`)
Maneja toda la lógica de autenticación:
- Login con código estudiantil
- Almacenamiento seguro del token JWT
- Gestión del estado de autenticación
- Cierre de sesión
- Validación de tokens
- Recuperación de información del usuario actual

#### Route Service (`src/app/services/route.service.ts`)
Gestiona los datos de las rutas:
- Obtención de la ruta actual
- Actualización automática del estado de la ruta cada minuto
- Manejo de estados de las paradas (completado, en proceso, pendiente)
- Implementación de BehaviorSubject para actualizaciones en tiempo real

### Configuración y Archivos de Soporte

#### `app.module.ts`
Módulo principal de la aplicación que configura:
- Importación de módulos necesarios (HttpClientModule, RouterModule)
- Declaración de componentes (Login, Home)
- Registro de servicios (AuthService, RouteService)
- Configuración de rutas y guardias

#### `app-routing.module.ts`
Define las rutas de la aplicación:
- `/login`: Ruta de autenticación
- `/home`: Ruta principal protegida
- Implementación de guardias de autenticación
- Redirecciones automáticas

## Guía de Instalación

1. Clonar el repositorio:
\`\`\`bash
git clone https://github.com/smestra/publicTransportationSolutionCTC.git
\`\`\`

2. Instalar dependencias:
\`\`\`bash
cd transporteestudiantilfront
npm install
\`\`\`

3. Iniciar el servidor de desarrollo:
\`\`\`bash
ng serve
\`\`\`

La aplicación estará disponible en `http://localhost:4200`

## Características Técnicas Destacadas

### Sistema de Autenticación
- Implementación de JWT para sesiones seguras
- Interceptores HTTP para manejo automático de tokens
- Guardias de ruta para protección de rutas autenticadas

### Timeline Interactivo
- Actualización en tiempo real sin necesidad de refrescar
- Estados visuales diferenciados (completado, en proceso, pendiente)
- Animaciones de transición suaves
- Cálculo automático de estados según la hora actual

### Gestión de Estado
- Uso de BehaviorSubject para manejo reactivo del estado
- Actualización automática cada minuto
- Limpieza automática de suscripciones
- Manejo eficiente de la memoria

## Buenas Prácticas Implementadas
- Componentes modulares y reutilizables
- Servicios singleton para lógica de negocio centralizada
- Tipado fuerte con TypeScript
- Manejo de errores centralizado
- Limpieza automática de suscripciones
- Uso de observables para datos reactivos

## Comandos Útiles

- `ng serve`: Inicia el servidor de desarrollo
- `ng build`: Compila el proyecto
- `ng test`: Ejecuta las pruebas unitarias
- `ng e2e`: Ejecuta las pruebas end-to-end

## Autor
- Sebastian Mestra - Desarrollo Frontend

## Licencia
Este proyecto está bajo la Licencia MIT.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
