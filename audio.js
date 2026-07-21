// ==========================================
// 🔊 SISTEMA DE AUDIO (audio.js)
// ==========================================

const MUSICA = {
  raining_somewhere: new Audio('music/raining_somewhere.mp3'),
  EverShop: new Audio('music/EverShop.mp3'),
  color_trophies: new Audio('music/color_trophies.mp3'),
  annoyingnighttime: new Audio('music/annoyingnighttime.mp3'),
  dark_rain: new Audio('music/dark_rain.mp3')
};

const SFX = {
  pou_gasp: new Audio('audio/pou_gasp.ogg'),
  comer: new Audio('audio/eat.wav'),
  comprar: new Audio('audio/buy.wav')
};

let musicaActual = null;
let volMusicaGlobal = 0.8;
let volSFXGlobal = 1.0;

// Configurar loops para la música
Object.values(MUSICA).forEach(track => {
  track.loop = true;
  track.volume = volMusicaGlobal;
});

window.reproducirMusica = function(nombre) {
  if (musicaActual && MUSICA[musicaActual]) {
    MUSICA[musicaActual].pause();
    MUSICA[musicaActual].currentTime = 0;
  }

  if (MUSICA[nombre]) {
    musicaActual = nombre;
    MUSICA[nombre].volume = volMusicaGlobal;
    MUSICA[nombre].play().catch(e => console.log("Autoplay bloqueado hasta interacción:", e));
  }
};

window.reproducirSFX = function(nombre) {
  if (SFX[nombre]) {
    SFX[nombre].currentTime = 0;
    SFX[nombre].volume = volSFXGlobal;
    SFX[nombre].play().catch(e => console.log("SFX bloqueado:", e));
  }
};

window.cambiarVolumenMusica = function(val) {
  volMusicaGlobal = parseFloat(val);
  if (musicaActual && MUSICA[musicaActual]) {
    MUSICA[musicaActual].volume = volMusicaGlobal;
  }
};

window.cambiarVolumenSFX = function(val) {
  volSFXGlobal = parseFloat(val);
};

