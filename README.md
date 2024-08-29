# Front Web Push App
Este es un proyecto de aplicación web que implementa notificaciones push, desarrollado con Next.js, un framework de React para aplicaciones web modernas. La aplicación se ha configurado con create-next-app y utiliza herramientas como next/font para optimizar automáticamente y cargar fuentes personalizadas.

Tabla de Contenidos:
1. Descripción del Proyecto
2. Características Principales
3. Tecnologías Utilizadas
4. Instalación
5. Uso

# Descripción del Proyecto:
Front Web Push App es una aplicación web diseñada para enviar notificaciones push a los usuarios. Utiliza las capacidades de Service Workers para manejar notificaciones incluso cuando la aplicación no está activa en el navegador. Esta herramienta es ideal para sitios web que necesitan mantener a sus usuarios informados con actualizaciones en tiempo real, alertas, promociones, y mucho más.

La aplicación se ha desarrollado con Next.js, lo que permite un renderizado del lado del servidor (SSR) eficiente, mejoras en SEO, y una experiencia de usuario más rápida.

# Características Principales:
* Notificaciones Push: Envío de notificaciones personalizadas a los usuarios, incluso cuando la aplicación no está abierta.
* Soporte para PWA: Implementación como Aplicación Web Progresiva (PWA), que permite añadirla a la pantalla de inicio y recibir         notificaciones fuera del navegador.
* Diseño Responsivo: Interfaz adaptable para diferentes dispositivos (móviles, tabletas y escritorio).
* Integración de Service Workers: Gestión de caché y manejo de notificaciones utilizando Service Workers.

# Tecnologías Utilizadas:
* Next.js - Framework de React para aplicaciones web.
* React - Biblioteca de JavaScript para la construcción de interfaces de usuario.
* Tailwind CSS - Framework de utilidades CSS para estilizar la aplicación.
* Vercel - Plataforma para desplegar aplicaciones web de Next.js.
* PostCSS - Herramienta para transformar CSS con JavaScript.
* Service Workers - Tecnología para manejar notificaciones push y tareas en segundo plano.

# Instalación:
Sigue los pasos a continuación para instalar y configurar el proyecto en tu entorno local:

1. Clona el repositorio:
* git clone https://github.com/Julius266/front-web-push-app.git
* cd front-web-push-app

2. Instala las dependencias:
```bash
npm install
```
# USO 
Para iniciar el servidor de desarrollo, ejecuta:
```bash
npm run dev
```
Abre http://localhost:3000 en tu navegador para ver la aplicación.