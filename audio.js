// ==========================================
// 🔊 SISTEMA DE AUDIO (audio.js)
// ==========================================

// Música de fondo (archivos .mp3 en la raíz)
const MUSICA = {
  raining_somewhere: new Audio('raining_somewhere.mp3'),
  EverShop: new Audio('EverShop.mp3'),
  color_trophies: new Audio('color_trophies.mp3'),
  annoyingnighttime: new Audio('annoyingnighttime.mp3'),
  dark_rain: new Audio('dark_rain.mp3')
};

// Efectos de sonido (archivos .ogg y .wav en la raíz)
const SFX = {
  buy: new Audio('buy.ogg'),
  click: new Audio('click.wav'),
  coin: new Audio('coin.ogg'),
  explosion: new Audio('explosion.ogg'),
  game_over: new Audio('game_over.ogg'),
  lazer: new Audio('lazer.ogg'),
  miei: new Audio('miei.ogg'),
  naaa32: new Audio('naaa32.ogg'),
  no: new Audio('no.ogg'),
  pou_confused: new Audio('pou_confused.ogg'),
  pou_eat: new Audio('pou_eat.ogg'),
  pou_gasp: new Audio('pou_gasp.ogg'),
  pou_potion: new Audio('pou_potion.ogg'),
  success: new Audio('success.ogg'),
  trak: new Audio('trak.ogg'),
  umbrella: new Audio('umbrella.ogg'),
  water_splash: new Audio('water_splash.ogg')
};

let musicaActual = null;
let volMusicaGlobal = 0.8;
let volSFXGlobal = 1.0;

// Configurar loops y volumen inicial para la música
Object.values(MUSICA).forEach(track => {
  track.loop = true;
  track.volume = volMusicaGlobal;
});

// Reproducir pista de música
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

// Detener música actual
window.detenerMusica = function() {
  if (musicaActual && MUSICA[musicaActual]) {
    MUSICA[musicaActual].pause();
    MUSICA[musicaActual].currentTime = 0;
    musicaActual = null;
  }
};

// Reproducir efecto de sonido
window.reproducirSFX = function(nombre) {
  if (SFX[nombre]) {
    // Clonamos o reiniciamos para permitir reproducción rápida superpuesta
    let sonido = SFX[nombre].cloneNode();
    sonido.volume = volSFXGlobal;
    sonido.play().catch(e => console.log("SFX bloqueado:", e));
  }
};

// Controles de volumen
window.cambiarVolumenMusica = function(val) {
  volMusicaGlobal = parseFloat(val);
  if (musicaActual && MUSICA[musicaActual]) {
    MUSICA[musicaActual].volume = volMusicaGlobal;
  }
};

window.cambiarVolumenSFX = function(val) {
  volSFXGlobal = parseFloa
    t(val);
};
