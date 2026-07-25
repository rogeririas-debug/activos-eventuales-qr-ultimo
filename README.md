# Código QR Inteligente para la Gestión y Promoción de Activos Eventuales

## Qué hace el proyecto
Asistente conversacional con IA, accesible mediante un código QR único por
activo eventual del banco (casas, vehículos, maquinaria). Permite a un
cliente potencial escanear el código en el bien físico y preguntar en
lenguaje natural sobre precio, ubicación, características y condiciones
de venta, sin depender de un asesor humano disponible en el momento.

## Cómo se usa
1. El cliente escanea el código QR colocado en el activo.
2. Se abre una página web con la ficha del activo y una ventana de chat.
3. El cliente escribe su pregunta y recibe una respuesta generada por IA
   basada únicamente en los datos reales de ese activo.

## Tecnologías utilizadas
- HTML5 + Tailwind CSS (CDN) + JavaScript (Vanilla JS) — frontend
- Netlify Functions (Node.js) — backend serverless
- API de OpenAI, modelo gpt-4o-mini — generación de respuestas
- Netlify — hosting y variables de entorno

## Cómo ejecutarlo localmente
1. Clonar este repositorio.
2. Instalar Netlify CLI: `npm install -g netlify-cli`
3. Crear un archivo `.env` con la variable `OPENAI_API_KEY=tu_clave`
4. Ejecutar: `netlify dev`
5. Abrir `http://localhost:8888/?activo=activo001`

## Estructura del proyecto
```
index.html                     -> Interfaz de usuario
data/activos.json              -> Ficha de datos de cada activo
netlify/functions/chat.js      -> Función serverless que llama a OpenAI
netlify.toml                   -> Configuración de despliegue en Netlify
```
