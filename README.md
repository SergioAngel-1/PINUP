# PINUP Dance Academy

Una plataforma web moderna para la gestión de una academia de baile urbano, desarrollada con React y tecnologías modernas.

## 🚀 Características

### Para Estudiantes
- Registro y gestión de cuenta
- Reserva de clases
- Seguimiento de progreso
- Sistema de pagos integrado
- Visualización de horarios

### Para Profesores
- Panel de control personalizado
- Gestión de clases
- Seguimiento de estudiantes
- Estadísticas de rendimiento

### Para Administradores
- Gestión completa de usuarios
- Análisis de datos
- Control de pagos
- Gestión de horarios

## 🛠️ Tecnologías Utilizadas

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Framer Motion
  - Lucide Icons

- **Estado y Gestión de Datos:**
  - IndexedDB (idb)
  - Context API

- **Herramientas de Desarrollo:**
  - Vite
  - ESLint
  - TypeScript

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/pinup-dance-academy.git

# Instalar dependencias
cd pinup-dance-academy
npm install

# Iniciar servidor de desarrollo
npm run dev
```

## 🔧 Configuración

El proyecto utiliza variables de entorno para configuraciones sensibles. Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_EMAIL_SERVICE_ID=tu_service_id
VITE_EMAIL_TEMPLATE_ID=tu_template_id
VITE_EMAIL_PUBLIC_KEY=tu_public_key
```

## 🗄️ Estructura del Proyecto

```
src/
├── components/        # Componentes reutilizables
├── lib/              # Utilidades y configuraciones
├── pages/            # Componentes de página
├── types/            # Definiciones de TypeScript
└── main.tsx          # Punto de entrada
```

## 🔐 Seguridad

- Autenticación de usuarios
- Encriptación de contraseñas
- Protección de rutas
- Validación de datos

## 🎨 Diseño

- Interfaz moderna y responsiva
- Animaciones fluidas
- Tema oscuro por defecto
- Componentes accesibles

## 📱 Compatibilidad

- Navegadores modernos
- Diseño responsive
- PWA ready

## 🤝 Contribución

Este proyecto es privado y no acepta contribuciones externas.

## 📄 Licencia

Ver el archivo [LICENSE](LICENSE) para detalles.