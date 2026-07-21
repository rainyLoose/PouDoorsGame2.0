// ==========================================
// CONTROL DE AUDIO Y VOLUMEN (PouDoorsGame 4.0)
// ==========================================

const BASE_URL = 'https://raw.githubusercontent.com/rainyLoose/PouDoorsGame2.0/';
const AUDIO_BRANCH = 'audio/';
const MUSIC_BRANCH = 'music/';

// Efectos de Sonido
const SFX = {
  achivement: new Audio(`${BASE_URL}${AUDIO_BRANCH}achivement.mp3`),
  buy: new Audio(`${BASE_URL}${AUDIO_BRANCH}buy.ogg`),
  click: new Audio(`${BASE_URL}${AUDIO_BRANCH}click.wav`),
  coin: new Audio(`${BASE_URL}${AUDIO_BRANCH}coin.ogg`),
  explosion: new Audio(`${BASE_URL}${AUDIO_BRANCH}explosion.ogg`),
  game_over: new Audio(`${BASE_URL}${AUDIO_BRANCH}game_over.ogg`),
  lazer: new Audio(`${BASE_URL}${AUDIO_BRANCH}lazer.ogg`),
  miei: new Audio(`${BASE_URL}${AUDIO_BRANCH}miei.ogg`),
  naaa32: new Audio(`${BASE_URL}${AUDIO_BRANCH}naaa32.ogg`),
  no: new Audio(`${BASE_URL}${AUDIO_BRANCH}no.ogg`),
  pou_confused: new Audio(`${BASE_URL}${AUDIO_BRANCH}pou_confused.ogg`),
  pou_eat: new Audio(`${BASE_URL}${AUDIO_BRANCH}pou_eat.ogg`),
  pou_gasp: new Audio(`${BASE_URL}${AUDIO_BRANCH}pou_gasp.ogg`),
  pou_potion: new Audio(`${BASE_URL}${AUDIO_BRANCH}pou_potion.ogg`),
  success: new Audio(`${BASE_URL}${AUDIO_BRANCH}success.ogg`),
  trak: new Audio(`${BASE_URL}${AUDIO_BRANCH}trak.ogg`),
  umbrella: new Audio(`${BASE_URL}${AUDIO_BRANCH}umbrella.ogg`),
  water_splash: new Audio(`${BASE_URL}${AUDIO_BRANCH}water_splash.ogg`)
};

// Música de Fondo
const BGM = {
  EverShop: new Audio(`${BASE_URL}${MUSIC_BRANCH}EverShop.mp3`),
  annoyingnighttime: new Audio(`${BASE_URL}${MUSIC_BRANCH}annoyingnighttime.mp3`),
  color_trophies: new Audio(`${BASE_URL}${MUSIC_BRANCH}color_trophies.mp3`),
  dark_rain: new Audio(`${BASE_URL}${MUSIC_BRANCH}dark_rain.mp3`),
  raining_somewhere: new Audio(`${BASE_URL}${MUSIC_BRANCH}raining_somewhere.mp3`)
};

// Configurar Loop en todas las músicas
Object.values(BGM).forEach(pista => pista.loop = true);

// Funciones de Control de Volumen
function cambiarVolumenMusica(valor) {
  Object.values(BGM).forEach(pista => pista.volume = valor);
}

function cambiarVolumenSFX(valor) {
  Object.values(SFX).forEach(efecto => efecto.volume = valor);
}

// Reproductor de Música Helper
function reproducirMusica(nombrePista) {
  Object.values(BGM).forEach(p => { p.pause(); p.currentTime = 0; });
  if (BGM[nombrePista]) {
    BGM[nombrePista].play();
  }
}
