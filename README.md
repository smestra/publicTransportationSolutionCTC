# INFORME TÉCNICO - SISTEMA DE TRANSPORTE GESTIÓN DE TRANSPORTE CTC

**Fecha:** Noviembre 2025  
**Versión:** 1.0  
**Estado:** En Desarrollo

---

## TABLA DE CONTENIDOS

1. [Información General del Proyecto](#1-información-general-del-proyecto)
2. [Descripción del Proyecto](#2-descripción-del-proyecto)
3. [Requerimientos del Sistema](#3-requerimientos-del-sistema)
4. [Diseño del Software](#4-diseño-del-software)
5. [Desarrollo e Implementación](#5-desarrollo-e-implementación)
6. [Pruebas y Validación](#6-pruebas-y-validación)
7. [Manual de Usuario](#7-manual-de-usuario)
8. [Conclusiones y Recomendaciones](#8-conclusiones-y-recomendaciones)
9. [Anexos](#9-anexos)

---

## 1. INFORMACIÓN GENERAL DEL PROYECTO

### 1.1 Nombre del Proyecto
**Sistema de Notificaciones y Gestión de Rutas de Transporte CTC**

### 1.2 Tipo de Software
Aplicación web de gestión y monitoreo en tiempo real de rutas de transporte estudiantil con sistema de notificaciones integrado.

### 1.3 Lenguajes de Programación Utilizados

| Componente | Lenguaje | Versión |
|-----------|----------|---------|
| Frontend | TypeScript | 5.1.3 |
| Framework Frontend | Angular | 16.2.0 |
| Backend | Java | 17+ (Spring Boot) |
| Base de Datos | SQL (Local) | - |
| Scripting | JavaScript/HTML5 | ES6+ |

### 1.4 Herramientas y Entornos de Desarrollo

| Herramienta | Propósito | Versión |
|-----------|-----------|---------|
| Angular CLI | Herramienta de desarrollo Angular | 16.2.16 |
| Node.js | Runtime JavaScript | 16+ |
| npm | Gestor de paquetes | 8+ |
| Visual Studio Code | Editor de código | Última |
| Git | Control de versiones | 2.x |
| Spring Boot | Framework Backend | 2.7.x / 3.x |
| JPA/Hibernate | ORM Base de datos | - |
| Lombok | Generador de código | - |
| JWT | Autenticación segura | - |
| Spring Security | Seguridad | - |

---

## 2. DESCRIPCIÓN DEL PROYECTO

### 2.1 Objetivo General

Desarrollar una plataforma web integrada que permita a empresas de transporte público visualizar en tiempo real el estado de las rutas de transporte al recibir notificaciones sobre cambios importantes y facilitar la gestión central de rutas y notificaciones por parte de administradores.

### 2.2 Problema que Resuelve

Antes de este sistema, las empresas de transporte no tenían una forma centralizada y en tiempo real de:
- Conocer el estado actual de su ruta de transporte
- Recibir y enviar notificaciones sobre cambios en las rutas
- Acceder a información sobre paradas y horarios
- Diferenciarse entre notificaciones globales (para todos) y personales (por ruta)

### 2.3 Usuarios a Quienes Está Dirigido

1. **Conductores:** Acceso a notificaciones personales y globales, visualización de rutas
2. **Administradores:** Creación y gestión de notificaciones, administración de rutas y usuarios
3. **Personal de Soporte:** Monitoreo del sistema y resolución de incidencias

### 2.4 Ventajas del Sistema

- **Comunicación en tiempo real:** Notificaciones instantáneas
- **Acceso desde cualquier dispositivo:** Interfaz responsive
- **Seguridad:** Autenticación JWT y Spring Security
- **Escalabilidad:** Arquitectura modular y servicios independientes
- **Usabilidad:** Interfaz intuitiva y amigable

---

## 3. REQUERIMIENTOS DEL SISTEMA

### 3.1 Requerimientos Funcionales

#### RF-001: Autenticación de Usuarios
- Sistema debe permitir login mediante código de usuario y contraseña
- Sistema debe generar token JWT válido por sesión
- Sistema debe mantener sesión activa mientras el token sea válido
- Sistema debe cerrar sesión y limpiar datos al logout

#### RF-002: Visualización de Notificaciones
- Sistema debe mostrar notificaciones globales (para todos los usuarios)
- Sistema debe mostrar notificaciones personales (por ruta del usuario)
- Sistema debe mostrar indicador de notificaciones no leídas
- Sistema debe diferenciar visualmente entre tipos de notificaciones

#### RF-003: Gestión de Notificaciones
- Usuario debe poder marcar notificaciones como leídas
- Usuario debe poder eliminar notificaciones
- Sistema debe cargar notificaciones al iniciar sesión
- Sistema debe actualizar lista de notificaciones automáticamente

#### RF-004: Creación de Notificaciones (Administrador)
- Administrador debe poder crear notificaciones globales
- Administrador debe poder crear notificaciones por ruta
- Sistema debe permitir seleccionar destinatarios (global/específico)
- Sistema debe validar datos antes de crear notificación

#### RF-005: Gestión de Información del Usuario
- Sistema debe mostrar nombre del usuario autenticado
- Sistema debe mostrar código del usuario
- Sistema debe mostrar carrera del usuario

### 3.2 Requerimientos No Funcionales

#### RNF-001: Seguridad
- Todas las peticiones al backend deben incluir token JWT
- Endpoints protegidos solo accesibles con autenticación válida
- Contraseñas debe ser encriptadas en backend
- Datos sensibles no deben exponerse en localStorage sin cifrado

#### RNF-002: Rendimiento
- Tiempo de carga inicial menor a 3 segundos
- Respuesta a actualizaciones de notificaciones menor a 500ms
- Interfaz debe permanecer responsiva durante peticiones al servidor
- Optimización de bundle de Angular

#### RNF-003: Disponibilidad
- Sistema debe estar disponible 24/7 (excepto mantenimiento)
- Tiempo de uptime mínimo 99%
- Sistema debe recuperarse automáticamente de fallos de conexión

#### RNF-004: Usabilidad
- Interfaz debe ser intuitiva y fácil de usar
- Tiempo de aprendizaje menor a 10 minutos
- Debe ser accesible desde dispositivos móviles y desktop
- Colores y estilos coherentes en toda la aplicación

#### RNF-005: Mantenibilidad
- Código debe seguir estándares de Angular
- Documentación completa de componentes y servicios
- Componentes modulares y reutilizables
- Tests automatizados para funcionalidades críticas

#### RNF-006: Escalabilidad
- Arquitectura debe soportar crecimiento de usuarios
- Base de datos optimizada con índices
- Frontend debe mantenerse responsivo con gran cantidad de notificaciones
- Backend debe escalar horizontalmente

---

## 4. DISEÑO DEL SOFTWARE

### 4.1 Diagrama de Casos de Uso

```
┌─────────────────────────────────────────────────────────────┐
│                   Sistema de Transporte CTC                 │
└─────────────────────────────────────────────────────────────┘

                    ┌──────────────┐
                    │  Estudiante  │
                    └──────┬───────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼
   ┌─────────┐      ┌──────────────┐   ┌─────────────┐
   │  Login  │      │   Ver Notif. │   │Marcar Leída │
   └─────────┘      └──────────────┘   └─────────────┘
        │                  │                  │
        └──────────────────┼──────────────────┘
                           │
                    ┌──────▼──────┐
                    │   Sistema   │
                    └─────────────┘


              ┌──────────────┐
              │ Administrador│
              └──────┬───────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
   ┌─────────┐  ┌───────────┐  ┌────────┐
   │  Login  │  │ Crear Not.│  │Gestionar│
   └─────────┘  │           │  │ Usuarios│
                │(Global/   │  └────────┘
                │Ruta)      │
                └───────────┘
```

### 4.2 Arquitectura del Sistema

```
┌─────────────────────────────────────────────────────────────┐
│                     CAPA PRESENTACIÓN                        │
│              (Angular Frontend - TypeScript)                 │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │              COMPONENTES ANGULAR                     │    │
│  │  ┌──────────┐  ┌──────┐  ┌────────┐  ┌──────────┐  │    │
│  │  │  Login   │  │Home  │  │Landing │  │ Crear    │  │    │
│  │  │Component │  │Page  │  │ Page   │  │Notif.   │  │    │
│  │  └──────────┘  └──────┘  └────────┘  └──────────┘  │    │
│  │                                                      │    │
│  └──────────────────────────────────────────────────────┘    │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │           SERVICIOS ANGULAR (Lógica)                 │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌────────────┐ │   │
│  │  │AuthService   │  │Notification  │  │RouteService│ │   │
│  │  │              │  │Service       │  │            │ │   │
│  │  └──────────────┘  └──────────────┘  └────────────┘ │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         INTERCEPTORES Y GUARDIAS                      │   │
│  │  ┌──────────────────┐  ┌────────────────────┐        │   │
│  │  │JWT Interceptor   │  │AuthGuard           │        │   │
│  │  │(Manejo de tokens)│  │(Protección rutas)  │        │   │
│  │  └──────────────────┘  └────────────────────┘        │   │
│  └──────────────────────────────────────────────────────┘   │
│                           │                                   │
│              HTTP/HTTPS (RxJS Observables)                   │
│                           │                                   │
├─────────────────────────────────────────────────────────────┤
│                    CAPA TRANSPORTE (HTTP)                    │
├─────────────────────────────────────────────────────────────┤
│                           │                                   │
│              http://localhost:8080/api                        │
│                           │                                   │
├─────────────────────────────────────────────────────────────┤
│                  CAPA DE APLICACIÓN (Backend)                │
│              (Spring Boot - Java & Spring Security)          │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           CONTROLADORES REST                         │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │    │
│  │  │ AuthController│  │NotifiController│  │RouteCtrl│  │    │
│  │  └──────────────┘  └──────────────┘  └──────────┘  │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │           SERVICIOS DE NEGOCIO                       │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │    │
│  │  │AuthService   │  │Notification  │  │RouteService│ │    │
│  │  │              │  │Service       │  │            │ │    │
│  │  └──────────────┘  └──────────────┘  └──────────┘  │    │
│  └──────────────────────────────────────────────────────┘    │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │         ENTIDADES JPA (Modelo de Datos)             │    │
│  │  ┌──────────┐  ┌──────────┐  ┌─────────────────┐   │    │
│  │  │Usuario   │  │Notificacion│  │Ruta             │   │    │
│  │  │Entity    │  │Entity      │  │Entity           │   │    │
│  │  └──────────┘  └──────────┘  └─────────────────┘   │    │
│  └──────────────────────────────────────────────────────┘    │
│                           │                                   │
├─────────────────────────────────────────────────────────────┤
│                    CAPA DE PERSISTENCIA                      │
├─────────────────────────────────────────────────────────────┤
│                           │                                   │
│                  Database SQL Local                          │
│              (MySQL/PostgreSQL/MariaDB)                      │
│                                                               │
│  ┌─────────────────────────────────────────────────────┐    │
│  │          TABLAS DE BASE DE DATOS                    │    │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────┐  │    │
│  │  │ USUARIOS     │  │NOTIFICACIONES│  │ RUTAS   │  │    │
│  │  │ - id         │  │ - id         │  │ - id     │  │    │
│  │  │ - codigo     │  │ - mensaje    │  │ - nombre │  │    │
│  │  │ - password   │  │ - tipo       │  │ - origen │  │    │
│  │  │ - nombre     │  │ - usuario_id │  │ - destino│  │    │
│  │  │ - carrera    │  │ - ruta_id    │  │ - orden  │  │    │
│  │  │ - fecha_reg  │  │ - leida      │  │ - estado │  │    │
│  │  │              │  │ - fecha      │  │          │  │    │
│  │  └──────────────┘  └──────────────┘  └──────────┘  │    │
│  └─────────────────────────────────────────────────────┘    │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### 4.3 Diagrama de Clases Principales

```
┌─────────────────────────────────────────────────────────────┐
│                      MODELO DE DATOS                         │
└─────────────────────────────────────────────────────────────┘

┌──────────────────────┐         ┌──────────────────────┐
│      Usuario         │         │   Notificacion       │
├──────────────────────┤         ├──────────────────────┤
│ - id: number         │◄────────│ - id: number         │
│ - codigo: string     │    1:N  │ - mensaje: string    │
│ - password: string   │         │ - tipo: string       │
│ - nombre: string     │         │ - usuario: Usuario   │
│ - carrera: string    │         │ - ruta: Ruta         │
│ - fechaRegistro: Date│         │ - leida: boolean     │
│ - activo: boolean    │         │ - fecha: Date        │
├──────────────────────┤         ├──────────────────────┤
│ + getNotificaciones()│         │ + marcarComoLeida()  │
│ + verificarPassword()│         │ + obtenerDetails()   │
│ + cambiarContrasena()│         └──────────────────────┘
└──────────────────────┘                   △
                                           │
                         ┌─────────────────┘
                         │
                    ┌────┴──────────────┐
                    │                   │
        ┌───────────────────┐   ┌───────────────────┐
        │  NotifGlobal      │   │  NotifPersonal    │
        ├───────────────────┤   ├───────────────────┤
        │ - alcance: all    │   │ - ruta: Ruta      │
        │ - prioridad: HIGH │   │ - usuario: Usuario│
        ├───────────────────┤   ├───────────────────┤
        │ + enviarATodos()  │   │ + enviarPorRuta() │
        └───────────────────┘   └───────────────────┘

┌──────────────────────────┐
│         Ruta             │
├──────────────────────────┤
│ - id: number             │
│ - nombre: string         │
│ - origen: string         │
│ - destino: string        │
│ - orden: number          │
│ - estado: string         │
│ - usuariosAsignados: User[]
├──────────────────────────┤
│ + obtenerParadas()       │
│ + actualizarEstado()     │
│ + obtenerNotificaciones()│
└──────────────────────────┘
```

### 4.4 Flujo de Autenticación

```
CLIENTE (Angular)              BACKEND (Spring Boot)
       │                                 │
       │ 1. POST /api/auth/login        │
       │ {codigo, password}              │
       ├─────────────────────────────────>│
       │                                 │
       │                    2. Validar credenciales
       │                    3. Encriptar contraseña
       │                    4. Generar JWT Token
       │                                 │
       │ 5. Response con token           │
       │<─────────────────────────────────┤
       │                                 │
       │ 6. Guardar en localStorage      │
       │ 7. Guardar en currentUser$      │
       │                                 │
       │ 8. GET /api/notificaciones      │
       │ Header: Authorization: Bearer <token>
       ├─────────────────────────────────>│
       │                                 │
       │ 9. Validar JWT                  │
       │ 10. Obtener notificaciones       │
       │                                 │
       │ 11. Response []Notificaciones    │
       │<─────────────────────────────────┤
       │                                 │
       └─────────────────────────────────┘
```

### 4.5 Estructura de Carpetas Frontend

```
FRONTEND/
├── src/
│   ├── app/
│   │   ├── guards/
│   │   │   └── auth.guard.ts          (Protección de rutas)
│   │   │
│   │   ├── interceptors/
│   │   │   └── jwt.interceptor.ts     (Manejo de tokens JWT)
│   │   │
│   │   ├── models/
│   │   │   └── notifications.models.ts (Interfaces de datos)
│   │   │
│   │   ├── services/
│   │   │   ├── auth.service.ts        (Autenticación)
│   │   │   ├── notification.service.ts (Gestión de notificaciones)
│   │   │   └── route.service.ts       (Gestión de rutas)
│   │   │
│   │   ├── views/
│   │   │   ├── login/
│   │   │   │   ├── login.component.ts
│   │   │   │   ├── login.component.html
│   │   │   │   └── login.component.css
│   │   │   │
│   │   │   ├── home/
│   │   │   │   ├── home.component.ts
│   │   │   │   ├── home.component.html
│   │   │   │   └── home.component.css
│   │   │   │
│   │   │   ├── landing-page/
│   │   │   │   ├── landing-page.component.ts
│   │   │   │   ├── landing-page.component.html
│   │   │   │   └── landing-page.component.css
│   │   │   │
│   │   │   └── crear-notificacion/
│   │   │       ├── crear-notificacion.component.ts
│   │   │       ├── crear-notificacion.component.html
│   │   │       └── crear-notificacion.component.css
│   │   │
│   │   ├── app-routing.module.ts      (Configuración de rutas)
│   │   ├── app.module.ts              (Módulo principal)
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   └── app.component.css
│   │
│   ├── assets/
│   │   └── LogoDeLaAplicación1.png
│   │
│   └── index.html
│
├── angular.json                       (Configuración Angular)
├── package.json                       (Dependencias npm)
└── tsconfig.json                      (Configuración TypeScript)
```

### 4.6 Esquema de Base de Datos

```sql
-- Tabla de Usuarios
CREATE TABLE usuarios (
    id INT PRIMARY KEY AUTO_INCREMENT,
    codigo VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    carrera VARCHAR(100),
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    activo BOOLEAN DEFAULT TRUE
);

-- Tabla de Rutas
CREATE TABLE rutas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    origen VARCHAR(100) NOT NULL,
    destino VARCHAR(100) NOT NULL,
    orden INT,
    estado VARCHAR(50),
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabla de Notificaciones
CREATE TABLE notificaciones (
    id INT PRIMARY KEY AUTO_INCREMENT,
    mensaje TEXT NOT NULL,
    tipo VARCHAR(20) NOT NULL,        -- 'GLOBAL' o 'PERSONAL'
    usuario_id INT,                   -- NULL para notificaciones globales
    ruta_id INT,                      -- Para notificaciones por ruta
    leida BOOLEAN DEFAULT FALSE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ruta_id) REFERENCES rutas(id)
);

-- Tabla de Relación Usuario-Ruta (Asignaciones)
CREATE TABLE usuario_ruta (
    usuario_id INT NOT NULL,
    ruta_id INT NOT NULL,
    fecha_asignacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (usuario_id, ruta_id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id),
    FOREIGN KEY (ruta_id) REFERENCES rutas(id)
);

-- Índices para optimización
CREATE INDEX idx_usuario_codigo ON usuarios(codigo);
CREATE INDEX idx_notif_usuario ON notificaciones(usuario_id);
CREATE INDEX idx_notif_ruta ON notificaciones(ruta_id);
CREATE INDEX idx_notif_fecha ON notificaciones(fecha);
CREATE INDEX idx_notif_leida ON notificaciones(leida);
```

---

## 5. DESARROLLO E IMPLEMENTACIÓN

### 5.1 Principales Funcionalidades Desarrolladas

#### 5.1.1 Sistema de Autenticación
- **Descripción:** Permite a usuarios autenticarse mediante código y contraseña
- **Tecnología:** JWT + Spring Security
- **Flujo:**
  1. Usuario ingresa código y contraseña
  2. Backend valida credenciales
  3. Backend genera JWT token
  4. Frontend almacena token en localStorage
  5. Token se envía automáticamente en todas las peticiones

**Código Relevante:**
```typescript
login(codigo: string, password: string): Observable<LoginResponse> {
  const loginData: LoginRequest = { codigo, password };
  return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData)
    .pipe(
      tap(response => {
        if (response && response.token) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('currentUser', JSON.stringify(response));
          this.currentUserSubject.next(response);
        }
      })
    );
}
```

#### 5.1.2 Sistema de Notificaciones
- **Descripción:** Gestión completa de notificaciones globales y personales
- **Características:**
  - Diferenciación entre notificaciones globales y personales
  - Marcar como leído/no leído
  - Eliminar notificaciones
  - Crear nuevas notificaciones (admin)

**Endpoints:**
```
GET    /api/notificaciones/usuarios/{codigo}/notificaciones
GET    /api/notificaciones
PUT    /api/notificaciones/{id}/leer
DELETE /api/notificaciones/{id}
POST   /api/notificaciones
```

#### 5.1.3 Interfaz de Usuario Responsiva
- **Landing Page:** Página de bienvenida con descripción del sistema
- **Login:** Formulario seguro con validación
- **Home:** Dashboard con visualización de notificaciones
- **Crear Notificación:** Formulario para administradores
- **Componentes CSS:** Estilos coherentes y responsivos

#### 5.1.4 Protección de Rutas
- **AuthGuard:** Protege rutas que requieren autenticación
- **JWT Interceptor:** Agrega token automáticamente a peticiones
- **Logout:** Limpia sesión y redirige a login

### 5.2 Lenguajes y Frameworks Utilizados

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Angular | 16.2.0 | Framework frontend |
| TypeScript | 5.1.3 | Lenguaje tipado para frontend |
| RxJS | 7.8.0 | Programación reactiva |
| Spring Boot | 2.7.x/3.x | Framework backend |
| Spring Security | - | Seguridad |
| JPA/Hibernate | - | ORM |
| Lombok | - | Generador de código |
| Bootstrap/CSS | - | Estilos |

### 5.3 Retos Técnicos Enfrentados

#### 5.3.1 Autenticación JWT
**Problema:** Mantener tokens seguros en el frontend y enviarlos automáticamente
**Solución:** Implementar JWT Interceptor que intercepta todas las peticiones HTTP

#### 5.3.2 Gestión de Estado Reactivo
**Problema:** Mantener sincronización entre componentes
**Solución:** Usar BehaviorSubject en servicios para compartir estado

#### 5.3.3 Validación de Formularios
**Problema:** Validar datos complejos en tiempo real
**Solución:** Usar Reactive Forms de Angular con validadores personalizados

#### 5.3.4 Manejo de Errores
**Problema:** Comunicar errores al usuario de forma clara
**Solución:** Implementar interceptor de errores global y servicios de alerta

#### 5.3.5 Diferenciación de Notificaciones
**Problema:** Distinguir entre notificaciones globales y personales
**Solución:** Usar campo `tipo` en BD y lógica condicional en componentes

---

## 6. PRUEBAS Y VALIDACIÓN

### 6.1 Estrategia de Pruebas

#### 6.1.1 Pruebas Unitarias
- **Framework:** Jasmine/Karma
- **Cobertura objetivo:** 80%
- **Componentes a probar:**
  - AuthService: login, logout, token management
  - NotificationService: CRUD de notificaciones
  - Componentes: renderizado, eventos, validación

#### 6.1.2 Pruebas de Integración
- Flujo completo de autenticación
- Creación y recuperación de notificaciones
- Interacción backend-frontend
- JWT token flow

#### 6.1.3 Pruebas de Aceptación
- Verificar requisitos funcionales
- Pruebas de usabilidad
- Casos de uso críticos

### 6.2 Proceso de Pruebas

```
┌─────────────────────────────────────────────────┐
│         PLAN DE PRUEBAS DEL SISTEMA             │
└─────────────────────────────────────────────────┘

FASE 1: PRUEBAS UNITARIAS
├─ AuthService
│  ├─ login() con credenciales válidas
│  ├─ login() con credenciales inválidas
│  ├─ logout() limpia datos
│  └─ isLoggedIn() retorna estado correcto
├─ NotificationService
│  ├─ obtenerNotificacionesUsuario() retorna datos
│  ├─ marcarComoLeida() actualiza estado
│  ├─ eliminarNotificacion() remueve de lista
│  └─ crearNotificacion() añade notificación
└─ Componentes
   ├─ LoginComponent renderiza formulario
   ├─ HomeComponent muestra notificaciones
   └─ CrearNotificacionComponent valida formulario

FASE 2: PRUEBAS DE INTEGRACIÓN
├─ Flujo de login
│  ├─ Usuario ingresa credenciales
│  ├─ Se hace petición POST al backend
│  ├─ Se recibe y almacena token
│  ├─ Se redirige a home
│  └─ Se cargan notificaciones automáticamente
├─ Flujo de gestión de notificaciones
│  ├─ Se obtienen notificaciones del backend
│  ├─ Se marcan como leídas
│  ├─ Se eliminan correctamente
│  └─ Se crea nueva notificación
└─ Protección de rutas
   ├─ Acceso sin token no permitido
   ├─ AuthGuard redirige a login
   └─ Token inválido redirige a login

FASE 3: PRUEBAS DE ACEPTACIÓN
├─ Caso de uso: Estudiante visualiza notificaciones
│  └─ Resultado: Notificaciones se muestran correctamente
├─ Caso de uso: Admin crea notificación
│  └─ Resultado: Notificación llega a destinatarios
├─ Caso de uso: Usuario marca notificación como leída
│  └─ Resultado: Notificación actualiza estado
└─ Caso de uso: Usuario cierra sesión
   └─ Resultado: Sesión termina y redirige a login

FASE 4: PRUEBAS DE RENDIMIENTO
├─ Tiempo de carga inicial < 3s
├─ Tiempo de respuesta API < 500ms
├─ Bundle size < 500KB
└─ Memory leak check
```

### 6.3 Resultados de Pruebas

| Tipo de Prueba | Estado | Comentarios |
|---|---|---|
| Autenticación | ✅ PASÓ | Login y token management funcionando |
| Notificaciones | ✅ PASÓ | CRUD completo funcionando |
| Protección de rutas | ✅ PASÓ | AuthGuard protege rutas correctamente |
| Interfaz | ✅ PASÓ | Responsive y accesible |
| Rendimiento | ⚠️ EN PROGRESO | Optimizaciones pendientes |

### 6.4 Correcciones Realizadas

1. **Error de atributos HTML en minúsculas:** Corregido `*ngIf` a `*ngif`, `*ngFor` a `*ngfor`
2. **Componente no declarado:** Eliminado `app-notification-card` no usado
3. **Parser error en bindings:** Movida lógica compleja a métodos de componente
4. **Falta de doctype:** Agregado `<!DOCTYPE html>` a templates

---

## 7. MANUAL DE USUARIO

### 7.1 Instalación y Configuración

#### 7.1.1 Requisitos Previos
```bash
# Node.js y npm
node --version  # v16 o superior
npm --version   # 8 o superior

# Angular CLI
npm install -g @angular/cli
```

#### 7.1.2 Instalación del Proyecto
```bash
# Clonar repositorio del frontend
git clone https://github.com/smestra/publicTransportationSolutionCTC.git 

# clonar repositorio del backend
# Navegar a carpeta frontend
cd FRONTEND

# Instalar dependencias
npm install
```

#### 7.1.3 Configuración del Backend
```bash
# Asegurarse que Spring Boot está corriendo en puerto 8080
# Base de datos debe estar accesible en localhost

# Verificar endpoint (en navegador o Postman)
curl http://localhost:8080/api/health
```

#### 7.1.4 Inicio del Servidor Frontend
```bash
# Iniciar servidor de desarrollo
npm start
# o
ng serve

# Navegar a http://localhost:4200
```

### 7.2 Guía Básica de Uso

#### 7.2.1 Inicio de Sesión
Una vez descargaod el proyecto y al haber instalado las dependencias, se debe inicializar tanto la BD como el microservicio Java (backend) y por ultimo ejecutar este proyecto Angular usando el comando ng serve -o

1. Abrir navegador y acceder a `http://localhost:4200`
2. Hacer clic en "Iniciar Sesión"
3. Ingresar:
   - **Código:** Tu código de usuario (ej: EST001)
   - **Contraseña:** Tu contraseña
4. Hacer clic en "Iniciar Sesión"
5. Si es correcta, serás redirigido a Home

#### 7.2.2 Ver Notificaciones
1. En la página Home verás sección "Notificaciones"
2. Se muestran dos tipos:
   - **🌍 Global:** Para todos los usuarios
   - **👤 Personal:** Específicas para tu ruta
3. Indicador visual "● Nueva" para notificaciones no leídas
4. Fecha de la notificación en formato DD/MM/YYYY HH:MM

#### 7.2.3 Marcar Notificación como Leída
1. Click en botón "✓ Marcar como leída" en la notificación
2. La notificación cambiará de color/estilo
3. Se actualizará el contador de no leídas

#### 7.2.4 Eliminar Notificación
1. Click en botón "🗑️ Eliminar" en la notificación
2. Aparecerá confirmación: "¿Está seguro?"
3. Confirmar eliminación
4. La notificación se removerá de la lista

#### 7.2.5 Crear Notificación (Admin)
1. Navegar a "Crear Notificación"
2. Llenar formulario:
   - **Tipo:** Global o Personal
   - **Mensaje:** Texto de la notificación
   - **Ruta (si aplica):** Seleccionar ruta
   - **Usuarios (si aplica):** Seleccionar destinatarios
3. Click en "Crear Notificación"
4. Confirmar éxito

#### 7.2.6 Cerrar Sesión
1. Click en botón "Cerrar Sesión" en navbar
2. Serás redirigido a Landing Page
3. Sesión finalizada y token removido

### 7.3 Pantallas Principales

#### 7.3.1 Landing Page
- **Ubicación:** http://localhost:4200/
- **Contenido:**
  - Logo y nombre del sistema
  - Descripción del proyecto
  - Características principales
  - Botón "Iniciar Sesión"
- **Acciones:** 
  - Click en "Iniciar Sesión" → va a login
  - Acceso si usuario ya está autenticado → redirige a home

#### 7.3.2 Login
- **Ubicación:** http://localhost:4200/login
- **Campos:**
  - Código de usuario
  - Contraseña
- **Botones:**
  - Iniciar Sesión
  - ¿Olvidaste la contraseña?
- **Validaciones:**
  - Campo requerido
  - Mínimo 3 caracteres en código
  - Mínimo 6 caracteres en contraseña

#### 7.3.3 Home
- **Ubicación:** http://localhost:4200/home
- **Protección:** Requiere autenticación
- **Secciones:**
  - Navbar con saludo del usuario
  - Header de notificaciones con contador
  - Lista de notificaciones (global + personal)
  - Botones de acción (marcar leída, eliminar)

#### 7.3.4 Crear Notificación
- **Ubicación:** http://localhost:4200/crear-notificacion
- **Protección:** Solo administradores
- **Campos:**
  - Tipo (Global/Personal)
  - Mensaje
  - Ruta (dinámico según tipo)
  - Usuarios destinatarios

### 7.4 Solución de Problemas Comunes

| Problema | Causa | Solución |
|----------|-------|----------|
| "No se puede conectar al servidor" | Backend no está corriendo | Iniciar Spring Boot en puerto 8080 |
| "Token inválido o expirado" | Sesión expirada | Cerrar sesión y volver a iniciar |
| "404 Not Found" | Ruta no existe | Verificar URL en navegador |
| "Notificaciones no cargan" | Error de API | Verificar backend logs y conexión |
| "Formulario no valida" | Datos incorrectos | Verificar validaciones requeridas |

---

## 8. CONCLUSIONES Y RECOMENDACIONES

### 8.1 Aprendizajes del Equipo

#### 8.1.1 Arquitectura y Diseño
- Importancia de una arquitectura bien definida desde el inicio
- Separación clara entre capas (presentación, lógica, persistencia)
- Modularity y reutilización de componentes ahorra tiempo

#### 8.1.2 Seguridad
- JWT es efectivo para autenticación stateless
- Spring Security proporciona capas de protección robustas
- Validación en frontend Y backend es crítico

#### 8.1.3 Experiencia de Usuario
- Interfaces responsivas mejoran experiencia
- Retroalimentación visual en tiempo real es importante
- Manejo de errores amigable reduce frustración

#### 8.1.4 Gestión del Proyecto
- Comunicación clara entre frontend y backend
- Definición clara de contratos (interfaces/DTOs)
- Control de versiones desde el inicio previene problemas

### 8.2 Posibles Mejoras Futuras

#### 8.2.1 Funcionalidades
- [ ] **Notificaciones en tiempo real:** WebSockets en lugar de polling
- [ ] **Historial de notificaciones:** Archivar notificaciones antiguas
- [ ] **Búsqueda de notificaciones:** Filtros por fecha, tipo, contenido
- [ ] **Notificaciones push:** Alertas en dispositivo móvil
- [ ] **Dashboard de admin:** Estadísticas y reportes
- [ ] **Gestión de usuarios:** Crear, editar, eliminar usuarios
- [ ] **Roles y permisos:** Sistema de autorización granular

#### 8.2.2 Performance
- [ ] **Lazy loading de módulos:** Cargar componentes bajo demanda
- [ ] **Caching:** Caché de datos frecuentemente accedidos
- [ ] **Compresión:** Gzip para reducir tamaño de bundle
- [ ] **CDN:** Distribuir assets estáticos
- [ ] **Optimización de imágenes:** Formatos modernos (WebP)

#### 8.2.3 Seguridad
- [ ] **Refresh tokens:** Renovar tokens automáticamente
- [ ] **2FA:** Autenticación de dos factores
- [ ] **Rate limiting:** Limitar intentos de login
- [ ] **Auditoría:** Registrar acciones de usuarios
- [ ] **Encriptación:** Datos sensibles encriptados en rest

#### 8.2.4 Testing
- [ ] **Coverage al 100%:** Todas las funciones testeadas
- [ ] **E2E tests:** Automatizar pruebas end-to-end
- [ ] **Load testing:** Pruebas de stress en producción
- [ ] **Security testing:** Penetration testing y análisis de seguridad

#### 8.2.5 DevOps
- [ ] **CI/CD pipeline:** Automatizar build y deploy
- [ ] **Containerización:** Docker para consistencia
- [ ] **Orchestración:** Kubernetes para escalabilidad
- [ ] **Monitoreo:** Logs centralizados y alertas
- [ ] **Backup:** Sistema de respaldo automático

#### 8.2.6 Documentación
- [ ] **API documentation:** Swagger/OpenAPI
- [ ] **Guía de contribución:** Para desarrolladores
- [ ] **Videos tutoriales:** Capacitación de usuarios
- [ ] **Troubleshooting guide:** Solución de problemas comunes

### 8.3 Reflexiones sobre el Proceso de Desarrollo

#### 8.3.1 Aciertos
✅ Separación clara de responsabilidades  
✅ Uso de patrones de diseño reconocidos  
✅ Comunicación efectiva entre equipos  
✅ Iteración continua y mejora  
✅ Documentación desde el inicio  

#### 8.3.2 Puntos de Mejora
⚠️ Más pruebas unitarias desde el principio  
⚠️ Definir API contracts más temprano  
⚠️ Feedback de usuarios más frecuente  
⚠️ Planeación de escalabilidad desde inicio  
⚠️ Documentación más detallada de decisiones técnicas  

#### 8.3.3 Recomendaciones Futuras
1. **Metodología Agile:** Sprints de 2 semanas con retrospectivas
2. **Code review:** Revisar todo código antes de merge
3. **Testing:** TDD (Test-Driven Development)
4. **Documentación:** Living documentation con diagramas
5. **Comunidad:** Compartir aprendizajes con el equipo

### 8.4 Sostenibilidad del Proyecto

El proyecto está diseñado para ser:
- **Mantenible:** Código limpio y bien documentado
- **Escalable:** Arquitectura modular y separada por capas
- **Seguro:** Autenticación y autorización implementadas
- **Evolutivo:** Fácil agregar nuevas funcionalidades
- **Moniterable:** Logs y errores bien gestionados

---

## 9. ANEXOS

### 9.1 Código Fuente - Componentes Principales

#### 9.1.1 auth.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface LoginRequest {
  codigo: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  codigo: string;
  nombre: string;
  carrera: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api';
  private currentUserSubject = new BehaviorSubject<LoginResponse | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();
  
  constructor(private http: HttpClient) {
    this.checkStoredToken();
  }

  login(codigo: string, password: string): Observable<LoginResponse> {
    const loginData: LoginRequest = { codigo, password };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      })
    };
    
    return this.http.post<LoginResponse>(`${this.apiUrl}/auth/login`, loginData, httpOptions)
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('token', response.token);
            localStorage.setItem('currentUser', JSON.stringify(response));
            this.currentUserSubject.next(response);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  getCurrentUser(): LoginResponse | null {
    return this.currentUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  private checkStoredToken(): void {
    const token = this.getToken();
    const currentUser = localStorage.getItem('currentUser');
    
    if (token && currentUser) {
      this.currentUserSubject.next(JSON.parse(currentUser));
    }
  }
}
```

#### 9.1.2 notification.service.ts
```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Notificacion, NotificacionRequest } from '../models/notifications.models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:8080/api/notificaciones';

  constructor(private http: HttpClient) {}

  obtenerNotificacionesUsuario(codigo: string): Observable<Notificacion[]> {
    const url = `${this.apiUrl}/usuarios/${codigo}/notificaciones`;
    return this.http.get<Notificacion[]>(url);
  }

  obtenerNotificacionesGlobales(): Observable<Notificacion[]> {
    return this.http.get<Notificacion[]>(this.apiUrl);
  }

  marcarComoLeida(id: number, codigoUsuario: string): Observable<Notificacion> {
    return this.http.put<Notificacion>(`${this.apiUrl}/${id}/leer`, { codigoUsuario });
  }

  eliminarNotificacion(id: number, codigoUsuario: string): Observable<Notificacion> {
    return this.http.delete<Notificacion>(`${this.apiUrl}/${id}`, {
      params: { codigoUsuario }
    });
  }

  crearNotificacion(request: NotificacionRequest): Observable<Notificacion> {
    return this.http.post<Notificacion>(this.apiUrl, request);
  }
}
```

### 9.2 Endpoints de API Backend

```
AUTENTICACIÓN
├─ POST   /api/auth/login                    Login de usuario
├─ POST   /api/auth/logout                   Logout de usuario
├─ POST   /api/auth/refresh-token            Renovar token JWT
└─ GET    /api/auth/verify-token             Verificar token válido

NOTIFICACIONES
├─ GET    /api/notificaciones                Obtener todas las notificaciones
├─ GET    /api/notificaciones/{id}           Obtener notificación por ID
├─ GET    /api/notificaciones/usuarios/{codigo}/notificaciones
│         Obtener notificaciones de usuario
├─ POST   /api/notificaciones                Crear nueva notificación
├─ PUT    /api/notificaciones/{id}           Actualizar notificación
├─ PUT    /api/notificaciones/{id}/leer      Marcar como leída
├─ DELETE /api/notificaciones/{id}           Eliminar notificación
└─ GET    /api/notificaciones/search         Buscar notificaciones

RUTAS
├─ GET    /api/rutas                         Obtener todas las rutas
├─ GET    /api/rutas/{id}                    Obtener ruta por ID
├─ POST   /api/rutas                         Crear nueva ruta
├─ PUT    /api/rutas/{id}                    Actualizar ruta
├─ DELETE /api/rutas/{id}                    Eliminar ruta
└─ GET    /api/rutas/{id}/paradas            Obtener paradas de ruta

USUARIOS
├─ GET    /api/usuarios                      Obtener todos usuarios
├─ GET    /api/usuarios/{codigo}             Obtener usuario por código
├─ POST   /api/usuarios                      Crear nuevo usuario
├─ PUT    /api/usuarios/{id}                 Actualizar usuario
├─ DELETE /api/usuarios/{id}                 Eliminar usuario
└─ POST   /api/usuarios/{id}/cambiar-password Cambiar contraseña
```

### 9.3 Capturas de Pantalla

#### 9.3.1 Landing Page
```
┌─────────────────────────────────────────────────────┐
│      Logo                        [Iniciar Sesión]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│    Bienvenido al Sistema de Transporte CTC         │
│                                                     │
│    Mantente informado sobre rutas importantes      │
│                                                     │
│              [Iniciar Sesión]                      │
│                                                     │
├─────────────────────────────────────────────────────┤
│                                                     │
│  [🌍 Notif. Globales]  [👤 Notif. Personales]    │
│  [🚌 Info. Rutas]      [📱 Acceso Fácil]         │
│                                                     │
├─────────────────────────────────────────────────────┤
│         © 2025 Sistema de Transporte CTC           │
└─────────────────────────────────────────────────────┘
```

#### 9.3.2 Login
```
┌─────────────────────────────────────────────────────┐
│      Logo           Sistema de Transporte CTC       │
├─────────────────────────────────────────────────────┤
│                                                     │
│              INICIAR SESIÓN                        │
│                                                     │
│  Código:        [___________________]              │
│  Contraseña:    [___________________]              │
│                                                     │
│              [Iniciar Sesión]                      │
│                                                     │
│              ¿Olvidaste tu contraseña?            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

#### 9.3.3 Home
```
┌─────────────────────────────────────────────────────┐
│   Bienvenido Juan         [Cerrar Sesión]          │
├─────────────────────────────────────────────────────┤
│  Notificaciones (5)              [🔄 Actualizar]   │
├─────────────────────────────────────────────────────┤
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 🌍 Global  ● Nueva    15/11/2024 10:30       │ │
│  │ Ruta: R-101 (Centro → Sur)                    │ │
│  │ Cambio de horario importante                   │ │
│  │ [🗑️ Eliminar] [✓ Marcar como leída]         │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
│  ┌───────────────────────────────────────────────┐ │
│  │ 👤 Personal         14/11/2024 09:15         │ │
│  │ Ruta: R-205 (Norte → Este)                    │ │
│  │ Tu ruta llega 10 minutos antes                 │ │
│  │ [🗑️ Eliminar]                                │ │
│  └───────────────────────────────────────────────┘ │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### 9.4 Dependencias del Proyecto

```json
{
  "@angular/animations": "^16.2.0",
  "@angular/common": "^16.2.0",
  "@angular/compiler": "^16.2.0",
  "@angular/core": "^16.2.0",
  "@angular/forms": "^16.2.0",
  "@angular/platform-browser": "^16.2.0",
  "@angular/platform-browser-dynamic": "^16.2.0",
  "@angular/router": "^16.2.0",
  "rxjs": "~7.8.0",
  "tslib": "^2.3.0",
  "zone.js": "~0.13.0"
}
```

### 9.5 Variables de Entorno

```bash
# .env (ejemplo)
API_URL=http://localhost:8080/api
NODE_ENV=development
ENABLE_LOGGING=true
JWT_EXPIRATION=3600
```

### 9.6 Enlaces del Repositorio

- **GitHub Repository:** https://github.com/smestra/publicTransportationSolutionCTC
- **Branch Principal:** `main`
- **Branch de Desarrollo:** `dev-jose`
- **Rama de Backup:** `backup`

### 9.7 Documentación Adicional

- **Angular Documentation:** https://angular.io
- **Spring Boot Documentation:** https://spring.io/projects/spring-boot
- **JWT Authentication:** https://jwt.io
- **Material Design:** https://material.io/design

### 9.8 Contacto y Soporte

- **Desarrolladores Frontend:** Sebastian Mestra, Gabriel Henao, Didier Perez
- **Desarrolladores Backend:** José Manuel Lopez, Luis Alejandro Rivas
- **Repositorio:** publicTransportationSolutionCTC
- **Issues:** GitHub Issues

---

## RESUMEN EJECUTIVO

El **Sistema de Notificaciones y Gestión de Rutas de Transporte CTC** es una aplicación web moderna desarrollada con Angular 16 y Spring Boot que proporciona una solución integral para:

✅ **Autenticación segura** mediante JWT y Spring Security  
✅ **Gestión de notificaciones** globales y personales en tiempo real  
✅ **Interfaz responsiva y amigable** accesible desde cualquier dispositivo  
✅ **Arquitectura escalable** preparada para crecer  
✅ **Seguridad robusta** con protección de rutas y validación  

El proyecto se encuentra en **fase de desarrollo activo** con todas las funcionalidades básicas implementadas y operacionales. Las mejoras futuras se enfocarán en funcionalidades avanzadas, rendimiento y seguridad.

**Estado General:** ✅ **EN PRODUCCIÓN**

---

**Documento generado:** 13 de Noviembre de 2025  
**Versión del Informe:** 1.0  
**Próxima revisión:** 31 de Diciembre de 2025
