# MASTERPROMPT — preguntaleamaria.com.ar
## Para Claude Code · Sitio web inmersivo completo

---

## CONTEXTO DEL PROYECTO

Estás construyendo el sitio web oficial de **MarIA**, el agente de inteligencia artificial especializado en cannabis medicinal y salud integrativa del ecosistema **Ancestra** (Neuquén, Patagonia, Argentina).

MarIA tiene identidad visual propia, diferenciada de Ancestra. Su personalidad es: **presencia tecnológica con alma humana**. No es un chatbot genérico. Es una entidad — precisa, sin juicio, disponible 24/7.

El dominio es `preguntaleamaria.com.ar`. El archivo del video hero es `hero_1.mp4` (ubicado en la raíz del proyecto junto al HTML).

---

## IDENTIDAD VISUAL DE MARÍA

### Paleta de colores
```css
--black: #050608;          /* fondo base absoluto */
--off-white: #F0F2F7;      /* texto principal */
--green-ancestra: #71CE6A; /* verde Ancestra — acento orgánico */
--green-dark: #2D4239;     /* verde oscuro — profundidad */
--green-glow: rgba(113, 206, 106, 0.15);
--green-glow-strong: rgba(113, 206, 106, 0.35);
--gray: #7A8699;
--border: rgba(255,255,255,0.07);
--border-green: rgba(113, 206, 106, 0.2);
```

**Nota sobre el color:** El video muestra a MarIA con cabello con puntas verdes (#71CE6A exacto, el verde de Ancestra). El sitio debe construirse alrededor de ese verde — no azul frío. El verde es el hilo conductor entre MarIA y Ancestra.

### Tipografía
- **Display / Hero:** `Instrument Serif` (italic para el nombre MarIA) — elegante, con personalidad, no genérico
- **Monospace / técnico:** `Space Mono` — para badges, labels, datos, código
- **Cuerpo / UI:** `DM Sans` — limpio, legible, moderno

Importar desde Google Fonts:
```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap
```

### Estética general
- Fondo negro profundo `#050608`
- Acentos en verde `#71CE6A` — brillos, glows, bordes, elementos activos
- Grilla sutil de puntos o líneas muy tenues como textura de fondo
- Sensación: **laboratorio de salud del futuro, con raíces patagónicas**
- No usar gradientes purple/violeta. No usar azul eléctrico. Solo negro, blanco y el verde de Ancestra.

---

## ESTRUCTURA DEL SITIO

El sitio es un **single-page** HTML/CSS/JS puro (sin frameworks, sin build step). Un solo archivo `index.html` más el video `hero_1.mp4`.

### Secciones en orden:

1. `<nav>` — Navegación fija
2. `#hero` — Hero con video de fondo (SECCIÓN PRINCIPAL)
3. `#stats` — Métricas del ecosistema
4. `#como-funciona` — Cómo funciona en 3 pasos
5. `#conocimiento` — Base de conocimiento (grid de cards)
6. `#evidencia` — Respaldo científico
7. `#profesionales` — Sección para médicos y farmacéuticos
8. `#ecosistema` — El ecosistema Ancestra
9. `#partners` — Formulario de contacto institucional
10. `#disclaimer` — Aviso legal
11. `#cta-final` — CTA final
12. `<footer>` — Footer

---

## SECCIÓN HERO — ESPECIFICACIONES DETALLADAS

Esta es la sección más importante. Construila con máxima precisión.

### El video
- Archivo: `hero_1.mp4`
- Contenido: avatar 3D femenino de MarIA — primer plano cinematográfico de su rostro. Cabello negro con puntas verdes (#71CE6A). Lentes con destellos digitales verdes en los ojos. Auriculares blancos. Fondo neutro claro en el video.
- Duración: 10 segundos, loop infinito, sin audio
- Resolución original: 1920×1080

### Tratamiento del video en el hero
```
position: absolute, inset: 0, width: 100%, height: 100%, object-fit: cover
object-position: center top  ← el rostro está en la mitad superior
autoplay, muted, loop, playsinline
```

**Overlay sobre el video (capas de abajo hacia arriba):**

1. **Capa base oscura:** `background: rgba(5, 6, 8, 0.45)` — para que el texto sea legible sin matar el video
2. **Gradiente izquierdo:** `background: linear-gradient(to right, rgba(5,6,8,0.85) 0%, rgba(5,6,8,0.4) 50%, transparent 100%)` — el texto queda sobre un lado más oscuro
3. **Gradiente inferior:** `background: linear-gradient(to top, rgba(5,6,8,1) 0%, transparent 40%)` — transición limpia al resto del sitio
4. **Viñeta perimetral sutil:** `box-shadow: inset 0 0 120px rgba(5,6,8,0.5)`

**Efecto verde en los bordes del video:**
Agregar un elemento con `box-shadow: inset 0 0 80px rgba(113,206,106,0.08)` para que el verde del cabello de MarIA "ilumine" sutilmente el borde del hero.

### Layout del hero
- Alto mínimo: `100vh`
- El contenido de texto se posiciona en la **mitad izquierda** del hero (el rostro de MarIA queda visible en la derecha/centro)
- Usar `display: grid; grid-template-columns: 1fr 1fr` o flexbox con el texto a la izquierda
- El texto NO tapa el rostro de MarIA

### Contenido del hero (lado izquierdo)

```
[BADGE animado]
AGENTE IA · SALUD INTEGRATIVA · CANNABIS MEDICINAL

[TÍTULO PRINCIPAL]
Preguntarle
a MarIA.

[SUBTÍTULO]
La primera IA especializada en cannabis medicinal de Argentina.
Información con evidencia. Sin turno. Sin juicio.

[CTA BUTTON]
→ ESCRIBIRLE A MARÍA POR WHATSAPP
  (botón verde, con ícono de WhatsApp SVG inline)

[MICRO-TEXTO]
Sin registro · Respuesta inmediata · 24 / 7
```

**Tipografía del título:**
- "Preguntarle" → `Instrument Serif`, italic, ~72px, color off-white
- "a MarIA." → `Instrument Serif`, italic, ~80px, con "MarIA" en `color: #71CE6A` y un `text-shadow: 0 0 40px rgba(113,206,106,0.4)` para que glowee sutilmente

### Animación de entrada del hero
Usar `@keyframes fadeUp` con `animation-delay` escalonado para cada elemento:
- Badge: delay 0.2s
- Título línea 1: delay 0.4s
- Título línea 2: delay 0.55s
- Subtítulo: delay 0.7s
- Botón CTA: delay 0.9s
- Micro-texto: delay 1.1s

### Badge animado
```html
<div class="hero-badge">
  <span class="pulse-dot"></span>
  AGENTE IA · SALUD INTEGRATIVA · CANNABIS MEDICINAL
</div>
```
El `pulse-dot` es un círculo verde de 7px que pulsa con `@keyframes`:
```css
@keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(0.7);opacity:0.5} }
```

---

## NAVEGACIÓN

```
[Logo: "Mar_IA" en Space Mono, la IA en verde]    [links]    [CTA button]
```

- Fija (`position: fixed`), fondo negro con `backdrop-filter: blur(12px)` y `background: rgba(5,6,8,0.88)`
- Border bottom: `0.5px solid rgba(255,255,255,0.07)`
- Links: `Cómo funciona · Conocimiento · Profesionales · Ecosistema`
- CTA: `CONSULTAR AHORA` — borde verde, texto verde, hover: fondo verde + texto negro

---

## SECCIÓN STATS

4 métricas en grilla horizontal, separadas por bordes finos:

| Número | Label |
|--------|-------|
| 50K+ | Pacientes en el ecosistema |
| 200+ | Profesionales de salud |
| 24/7 | Disponibilidad |
| 0 | Juicio. Solo información. |

Los números en `Space Mono`, `font-size: 36px`, color `#71CE6A`.
Labels en `DM Sans`, `12px`, gris.

---

## SECCIÓN CÓMO FUNCIONA

Layout: dos columnas — texto a la izquierda, pasos a la derecha.

**Título:** "Tres pasos. Una respuesta."

**3 pasos:**
1. **Escribís tu consulta** — Por WhatsApp. En tus palabras. MarIA entiende el contexto.
2. **MarIA responde con evidencia** — Base científica actualizada, regulación argentina, sin alucinar datos.
3. **Te conecta si lo necesitás** — Cuando la consulta requiere profesional, MarIA conecta con el especialista correcto del ecosistema. Con contexto, no en frío.

Cada paso: número en `Space Mono` verde + título en `Space Mono` blanco + descripción en `DM Sans` gris.
Separadores horizontales `0.5px solid rgba(255,255,255,0.07)`.

---

## SECCIÓN CONOCIMIENTO

**Título:** "Lo que MarIA sabe. Y lo que no inventa."

Grid 3×2 de cards oscuras. Cada card tiene:
- Label en `Space Mono` verde pequeño (ej: `CANNABIS`)
- Título en `Space Mono` blanco
- Descripción en `DM Sans` gris

Cards:
1. **CANNABIS** — Sistema endocannabinoide / CBD, THC, CBN, CBG. Formas de administración, biodisponibilidad, interacciones, REPROCANN, prescripción en Argentina.
2. **REGULACIÓN** — Marco legal argentino / Ley 27350, DNU 70/2023, ANMAT, obras sociales. Lo que puede y no puede hacer un médico hoy.
3. **SALUD MENTAL** — Integración terapéutica / Ansiedad, depresión, TEPT, dolor crónico. Terapias complementarias con evidencia.
4. **EVIDENCIA** — Literatura científica / JAMA, Lancet, Nature, CONICET. MarIA cita fuentes. Nunca alucina.
5. **PROTOCOLO** — Preparación e integración / Set y setting, acompañamiento entre consultas, seguimiento longitudinal.
6. **TRIAGE** — Derivación inteligente / MarIA sabe cuándo termina su rol. Detecta urgencias. Conecta con el profesional correcto.

Hover en cada card: leve iluminación del borde con `border-color: rgba(113,206,106,0.3)`.

---

## SECCIÓN EVIDENCIA CIENTÍFICA

Background ligeramente más claro (`#070A10`). 

**Título:** "Evidencia que respalda cada respuesta."

Grid 3 columnas de cards con borde verde sutil y línea verde en el top:

1. **Psilocibina y trastorno por consumo** — Ensayo fase 2: 72% reducción en recaídas, NNT 3.33, 90% retención a 180 días. Cero eventos adversos severos. / *JAMA Network Open · 2026*
2. **Cannabis medicinal en Argentina** — 50.000+ pacientes en seguimiento en el ecosistema Ancestra. Datos de mundo real procesados por Proyecto TAP. / *Ancestra Research · Neuquén*
3. **Equipo médico especializado** — Psiquiatras, neurocientíficas CONICET, especialistas en salud mental integrativa. MarIA está entrenada sobre su trabajo. / *Hospital Italiano · UBA · CONICET · BrainLab*

---

## SECCIÓN PROFESIONALES

**Título:** "Un recurso para quienes acompañan pacientes."

Dos cards lado a lado:

**Médicos y psicólogos**
> Consultá protocolos, evidencia actualizada e interacciones farmacológicas antes de la consulta. MarIA habla en tu idioma.
- Revisión de literatura científica reciente
- Interacciones cannabis-fármacos
- Protocolos de dosificación en estudios
- Marco regulatorio vigente
- Conexión con red Ancestra

**Farmacéuticos y dispensadores**
> Información técnica sobre productos, biodisponibilidad y formas farmacéuticas para acompañar mejor al paciente.
- Perfiles de cannabinoides por presentación
- Interacciones relevantes en farmacia
- Regulación ANMAT actualizada
- Modelo Espacio Ancestra
- Capacitación en red

Listas con flechas verdes `→` como bullets.

---

## SECCIÓN ECOSISTEMA ANCESTRA

**Título:** "MarIA es la puerta. Ancestra es el sistema."

4 cards en grilla:

| Tag | Nombre | Descripción |
|-----|--------|-------------|
| APP | Ancestra | Telemedicina, prescripción y dispensación integrada. |
| RED | Espacio Ancestra | Red de farmacias especializadas en cannabis medicinal. |
| INVESTIGACIÓN | Proyecto TAP | Infraestructura de evidencia clínica en terapias emergentes. |
| COMUNIDAD | Flora ONG | Acceso legal, seguro y acompañado al cannabis para adultos. |

---

## FORMULARIO DE CONTACTO INSTITUCIONAL

**Título:** "¿Querés integrar MarIA a tu institución?"
**Subtítulo:** "Clínicas, hospitales, obras sociales, universidades."

Campos:
- NOMBRE / INSTITUCIÓN
- WHATSAPP O EMAIL
- ¿CÓMO QUERÉS USAR MARÍA?

Botón: `ENVIAR CONSULTA →` — borde verde, hover fondo verde.

**Aclaración:** El formulario es visual/estático por ahora. El `action` puede apuntar a un mailto o dejarse vacío con un `preventDefault` y mensaje de confirmación en JS.

---

## DISCLAIMER LEGAL

Box con borde verde muy sutil y pseudo-elemento `::before` con el texto "AVISO LEGAL" flotando sobre el borde:

> MarIA es un agente de inteligencia artificial especializado en información sobre cannabis medicinal y salud integrativa. Sus respuestas tienen fines educativos e informativos exclusivamente. **No reemplaza la consulta con un profesional de la salud, no realiza diagnósticos ni prescripciones.** Ante cualquier emergencia médica, contactá al SAME: 107.

---

## CTA FINAL

Sección centrada, fondo negro con glow verde difuso:

```
EMPEZAR AHORA

Tu duda tiene respuesta.
Preguntarle a MarIA.

[Sin turno · Sin registro · Sin juicio]

→ ESCRIBIRLE A MARÍA POR WHATSAPP
```

El título usa `Instrument Serif` italic, el nombre "MarIA" en verde con glow.

---

## FOOTER

```
MarIA · por Ancestra · Neuquén, Patagonia          Cómo funciona · Profesionales · Partners · Privacidad
```

---

## ANIMACIONES Y EFECTOS GLOBALES

### Scroll reveal
Implementar con `IntersectionObserver`. Cada sección tiene sus elementos con clase `.reveal` que arranca con `opacity: 0; transform: translateY(30px)` y al entrar en viewport transiciona a `opacity: 1; transform: translateY(0)` con `transition: 0.7s ease`.

### Hover en cards
```css
.card:hover {
  border-color: rgba(113, 206, 106, 0.3);
  background: #0D1018;
  transition: all 0.2s ease;
}
```

### Cursor personalizado (opcional pero recomendado)
Un cursor custom: círculo verde de 20px con `mix-blend-mode: difference` que sigue al mouse con un pequeño lag (JS con `lerp`).

### Grilla de fondo
En el body o en secciones clave, textura de puntos muy sutil:
```css
background-image: radial-gradient(rgba(113,206,106,0.06) 1px, transparent 1px);
background-size: 32px 32px;
```

### Scrollbar
```css
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: var(--black); }
::-webkit-scrollbar-thumb { background: #2D4239; }
::-webkit-scrollbar-thumb:hover { background: #71CE6A; }
```

---

## BOTÓN DE WHATSAPP

En todas las ocurrencias del CTA de WhatsApp, usar este SVG inline para el ícono:

```html
<svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.114.554 4.1 1.524 5.824L.057 23.998l6.305-1.654A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.885 0-3.652-.52-5.17-1.427l-.371-.22-3.844 1.008 1.027-3.742-.241-.385A9.953 9.953 0 012 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
</svg>
```

El href del botón: `https://wa.me/5492994XXXXXX` — reemplazar con el número real de WhatsApp Business de MarIA.

---

## ESTRUCTURA DE ARCHIVOS

```
preguntaleamaria/
├── index.html          ← todo el sitio en un solo archivo
└── hero_1.mp4          ← video del avatar de MarIA
```

---

## NOTAS FINALES PARA CLAUDE CODE

1. **El video es el corazón del hero.** Todo el diseño orbita alrededor del rostro de MarIA. El texto se posiciona para convivir con ella, no taparla.

2. **El verde `#71CE6A` es el único color de acento.** No agregar azules, violetas ni otros colores. Solo negro, off-white y ese verde.

3. **No usar frameworks.** HTML/CSS/JS puro. Sin React, sin Tailwind, sin dependencias externas salvo Google Fonts.

4. **Mobile-first responsive.** En mobile, el hero muestra el video en full width con overlay más oscuro y el texto centrado en la parte inferior del hero.

5. **Performance del video:** Agregar `<source src="hero_1.mp4" type="video/mp4">` dentro del `<video>`. Si el navegador no soporta video, el fondo cae al negro con un glow verde.

6. **No agregar música ni audio.** El video es muted, decorativo.

7. **Accesibilidad mínima:** El `<video>` debe tener `aria-hidden="true"`. Los botones CTA deben tener `aria-label` descriptivo.

8. **El sitio debe verse extraordinario.** No es un MVP. Es la presentación pública de una IA que representa un ecosistema de salud serio. Cada detalle importa.
