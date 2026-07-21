// ==========================================
// LÓGICA DE JUEGO Y GUARDADO (partida.pou)
// ==========================================

let estadoJuego = {
  monedas: 100,
  hambre: 100,
  energia: 100,
  miedo: 0,
  humedad: 0,
  inventario: [],
  equipado: null
};

function cargarPartida() {
  const guardado = localStorage.getItem('partida.pou');
  if (guardado) {
    const datos = JSON.parse(guardado);
    estadoJuego = {
      ...estadoJuego,
      ...datos,
      miedo: datos.miedo !== undefined ? datos.miedo : 0,
      humedad: datos.humedad !== undefined ? datos.humedad : 0
    };
  }
}

function guardarPartida() {
  localStorage.setItem('partida.pou', JSON.stringify(estadoJuego));
}

// Evento de Tormenta "Dark Rain" (10 Minutos)
let intervaloRayo = null;

function iniciarTormenta() {
  reproducirMusica('dark_rain');
  SFX.pou_gasp.play();

  // Rayo cada 40 segundos
  intervaloRayo = setInterval(() => {
    SFX.explosion.play();
    
    // 1% probabilidad de rayo directo
    if (Math.random() < 0.01) {
      SFX.game_over.play();
      alert("¡Te cayó un rayo! Game Over.");
    } else {
      estadoJuego.miedo = Math.min(100, estadoJuego.miedo + 15);
      if (estadoJuego.equipado !== 'paraguas') {
        estadoJuego.humedad = Math.min(100, estadoJuego.humedad + 20);
      }
      guardarPartida();
    }
  }, 40000);
}

// Iniciar cargando datos de partida
cargarPartida();
