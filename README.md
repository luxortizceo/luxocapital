# Luxo Capital

Sitio web de Luxo Capital, consultoría financiera independiente enfocada en orientación sobre AFORE, pensiones, Modalidad 40, retiro por desempleo y planificación patrimonial.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (tokens de marca en `src/index.css`)
- **GSAP** para animaciones de entrada
- **Three.js** (vanilla, con carga diferida) para la escena 3D del hero y la escena de partículas morfológicas
- **React Router** para las páginas legales

## Desarrollo

```bash
npm install
npm run dev
```

## Build de producción

```bash
npm run build
npm run preview
```

## Estructura

```
src/
  components/   Componentes reutilizables de UI
  sections/     Secciones de la página principal
  three/        Escenas 3D (hero y partículas morfológicas)
  hooks/        Hooks compartidos (scroll reveal, tilt, reduced motion, etc.)
  utils/        Utilidades (WhatsApp, sanitización, finanzas, GSAP)
  data/         Configuración central editable (teléfono, enlaces, servicios, FAQ, textos legales)
  pages/        Páginas de routing (inicio, avisos legales, 404)
```

## Contenido editable

Todos los textos, enlaces de WhatsApp, teléfono y datos de servicios/FAQ se administran desde `src/data/config.ts` y `src/data/legal.ts`, sin necesidad de tocar los componentes.

## Avisos importantes

Luxo Capital es una consultoría independiente. No es una AFORE, institución bancaria, aseguradora ni dependencia gubernamental. Todo el contenido del sitio evita prometer aprobaciones, montos o rendimientos garantizados.
