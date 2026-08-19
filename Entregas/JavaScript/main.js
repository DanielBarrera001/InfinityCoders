/* ============================================
   INFINITY CODERS · MAPA CÓSMICO
   js/main.js — JavaScript COMPARTIDO general
   (la lógica del asistente de IA va aparte,
   en js/si-assistant.js, cuando exista esa página)
   Cada quien agrega sus funciones al final,
   en su propio bloque comentado con su nombre.
   ============================================ */

/* ---------- 1. FONDO DE ESTRELLAS ANIMADO ----------
   Dibuja un cielo de estrellas que titilan lentamente
   sobre el <canvas id="starfield"> definido en el HTML.
   Corre en index.html y destinos.html por igual, porque
   ambas páginas tienen el mismo <canvas>. */
(function iniciarEstrellas() {
  const canvas = document.getElementById("starfield");
  if (!canvas) return; // si la página no tiene canvas, no hace nada

  const ctx = canvas.getContext("2d");
  let ancho, alto, estrellas;

  function ajustarTamano() {
    ancho = canvas.width = window.innerWidth;
    alto = canvas.height = window.innerHeight;
  }

  function crearEstrellas(cantidad) {
    estrellas = [];
    for (let i = 0; i < cantidad; i++) {
      estrellas.push({
        x: Math.random() * ancho,
        y: Math.random() * alto,
        radio: Math.random() * 1.4 + 0.3,
        velocidadTitileo: Math.random() * 0.02 + 0.005,
        fase: Math.random() * Math.PI * 2, // desfasa el titileo para que no titilen todas juntas
      });
    }
  }

  function dibujar() {
    ctx.clearRect(0, 0, ancho, alto);
    for (const estrella of estrellas) {
      estrella.fase += estrella.velocidadTitileo;
      const brillo = 0.4 + Math.sin(estrella.fase) * 0.4;

      ctx.beginPath();
      ctx.arc(estrella.x, estrella.y, estrella.radio, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(248, 249, 250, ${brillo})`; // usa el Texto Principal (#F8F9FA) del PDF
      ctx.fill();
    }
    requestAnimationFrame(dibujar);
  }

  ajustarTamano();
  crearEstrellas(Math.floor((ancho * alto) / 8000));
  dibujar();

  window.addEventListener("resize", () => {
    ajustarTamano();
    crearEstrellas(Math.floor((ancho * alto) / 8000));
  });
})();

/* ---------- 2. ANIMACIÓN AL HACER SCROLL ----------
   Vuelve a activar la animación .aparece en cualquier tarjeta
   (tripulación o planetas) justo cuando entra en pantalla. */
document.addEventListener("DOMContentLoaded", () => {
  const elementosARevelar = document.querySelectorAll(".crew-card, .tarjeta-planeta");

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("aparece");
          observador.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  elementosARevelar.forEach((el) => observador.observe(el));
});

/* ---------- 3. RELOJ DE MISIÓN (MET) ----------
   Cuenta cuánto tiempo lleva la persona en la página,
   formateado como T+ HH:MM:SS, igual que en el machote. */
document.addEventListener("DOMContentLoaded", () => {
  const elementoReloj = document.getElementById("reloj-valor");
  if (!elementoReloj) return; // solo existe en index.html por ahora

  const inicio = Date.now();

  function formatearDosDigitos(numero) {
    return String(numero).padStart(2, "0");
  }

  function actualizarReloj() {
    const segundosTranscurridos = Math.floor((Date.now() - inicio) / 1000);
    const horas = Math.floor(segundosTranscurridos / 3600);
    const minutos = Math.floor((segundosTranscurridos % 3600) / 60);
    const segundos = segundosTranscurridos % 60;

    elementoReloj.textContent =
      `T+ ${formatearDosDigitos(horas)}:${formatearDosDigitos(minutos)}:${formatearDosDigitos(segundos)}`;
  }

  actualizarReloj();
  setInterval(actualizarReloj, 1000); // se actualiza cada segundo
});

/* ---------- 4. BADGE "SISTEMA EN LÍNEA" ----------
   Detalle decorativo tipo HUD: cada tanto cambia el
   texto del badge para simular actividad del sistema. */
document.addEventListener("DOMContentLoaded", () => {
  const textoEstado = document.getElementById("estado-texto");
  if (!textoEstado) return;

  const mensajes = ["Sistema en línea", "Telemetría activa", "Enlace estable"];
  let indice = 0;

  setInterval(() => {
    indice = (indice + 1) % mensajes.length;
    textoEstado.textContent = mensajes[indice];
  }, 4000); // cambia cada 4 segundos
});

/* ============================================
   A partir de acá: funciones específicas.
   Ejemplo de cómo agregar la tuya sin pisar lo de arriba:

   ---------- Bloque de [tu nombre] ----------
   function miFuncion() { ... }
   ============================================ */