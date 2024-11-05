# PINUP Dance Academy

Una plataforma web moderna y progresiva (PWA) para la gestión integral de una academia de baile urbano, desarrollada con React y tecnologías de vanguardia.

## 🌟 Características Principales

### Estudiantes
- Sistema de registro y autenticación segura
- Reserva y gestión de clases en tiempo real
- Seguimiento personalizado del progreso
- Sistema de pagos integrado
- Visualización de horarios y disponibilidad
- Perfil personalizable con preferencias de baile

### Profesores
- Panel de control personalizado
- Gestión de clases y horarios
- Seguimiento de estudiantes
- Estadísticas de rendimiento
- Comunicación directa con estudiantes

### Administradores
- Gestión completa de usuarios y roles
- Análisis de datos y métricas
- Control de pagos y facturación
- Gestión de horarios y disponibilidad
- Panel de administración avanzado

## 💻 Tecnologías

### Frontend
- React 18 con TypeScript
- Tailwind CSS para estilos
- Framer Motion para animaciones
- Lucide Icons para iconografía
- React Router para navegación

### Estado y Datos
- IndexedDB (idb) para almacenamiento local
- Context API para gestión de estado
- TypeScript para tipado estático

### PWA
- Service Workers para funcionamiento offline
- Instalable en dispositivos móviles y escritorio
- Actualizaciones automáticas
- Caché inteligente de recursos

### Desarrollo
- Vite como bundler y dev server
- ESLint para linting
- TypeScript para tipado
- Prettier para formateo de código
- Email JS para envío de correos electrónicos

## 🚀 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/sergioAngel-1/PINUP.git

# Instalar dependencias
cd pinup
npm install

# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm run build
```

## ⚙️ Configuración

El proyecto utiliza variables de entorno para configuraciones sensibles. Crea un archivo `.env` en la raíz:

```env
VITE_EMAIL_SERVICE_ID=tu_service_id
VITE_EMAIL_TEMPLATE_ID=tu_template_id
VITE_EMAIL_PUBLIC_KEY=tu_public_key
```

## 📁 Estructura del Proyecto

```
src/
├── components/     # Componentes reutilizables
│   ├── dashboard/  # Componentes del panel de control
│   ├── debug/      # Herramientas de desarrollo
│   └── pwa/        # Componentes relacionados con PWA
├── hooks/          # Custom hooks
├── lib/           # Utilidades y configuraciones
│   ├── db/        # Configuración y operaciones de IndexedDB
│   └── auth/      # Lógica de autenticación
├── pages/         # Componentes de página
├── types/         # Definiciones de TypeScript
└── main.tsx       # Punto de entrada
```

## 🔒 Seguridad

- Autenticación segura de usuarios
- Encriptación de datos sensibles
- Protección de rutas
- Validación de datos
- Manejo seguro de sesiones

## 🎨 Características de Diseño

- Interfaz moderna y responsiva
- Tema oscuro por defecto
- Animaciones fluidas y optimizadas
- Componentes accesibles (WAI-ARIA)
- Diseño adaptativo para todos los dispositivos

## 📱 Compatibilidad

- Navegadores modernos (Chrome, Firefox, Safari, Edge)
- Diseño responsive para todos los dispositivos
- PWA instalable en dispositivos móviles y escritorio
- Soporte offline
- Actualizaciones automáticas

## 🤝 Contribución

Este proyecto es privado y no acepta contribuciones externas.

## 📄 Licencia

Ver el archivo [LICENSE](LICENSE) para detalles.