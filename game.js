// ==========================================
// 🎮 LÓGICA DE JUEGO (game.js)
// ==========================================

window.estadoJuego = {
  monedas: 100,
  hambre: 0,
  maxHambre: 250,
  empapacho: 0,
  miedo: 0,
  humedad: 0,
  dia: 1,
  inventario: []
};

window.eventoTormentaActivo = false;

window.actualizarInterfaz = function() {
  const porcHambre = (window.estadoJuego.hambre / window.estadoJuego.maxHambre) * 100;
  
  if (document.getElementById('miedo-val')) document.getElementById('miedo-val').style.width = window.estadoJuego.miedo + '%';
  if (document.getElementById('humedad-val')) document.getElementById('humedad-val').style.width = window.estadoJuego.humedad + '%';
  if (document.getElementById('hambre-val')) document.getElementById('hambre-val').style.width = porcHambre + '%';
  if (document.getElementById('empapacho-val')) document.getElementById('empapacho-val').style.width = window.estadoJuego.empapacho + '%';
  if (document.getElementById('monedas-txt')) document.getElementById('monedas-txt').innerText = window.estadoJuego.monedas;
  if (document.getElementById('hambre-txt')) document.getElementById('hambre-txt').innerText = `${window.estadoJuego.hambre}/${window.estadoJuego.maxHambre}`;
  if (document.getElementById('dia-txt')) document.getElementById('dia-txt').innerText = window.estadoJuego.dia;
};

window.agregarEvento = function(texto) {
  const box = document.getElementById('eventos-box');
  if (!box) return;
  const lineas = box.innerHTML.split('<br>').filter(l => l.trim() !== '');
  lineas.unshift('• ' + texto);
  if (lineas.length > 3) lineas.pop(); // Solo muestra los 3 eventos más recientes
  box.innerHTML = lineas.join('<br>');
};

window.comprarEstomagoExtra = function() {
  if (window.estadoJuego.monedas >= 100) {
    if (window.estadoJuego.maxHambre >= 400) {
      window.agregarEvento("¡Ya tienes la capacidad máxima (400)!");
      return;
    }
    window.estadoJuego.monedas -= 100;
    window.estadoJuego.maxHambre = 400;
    if (typeof window.reproducirSFX === 'function') window.reproducirSFX('comprar');
    window.actualizarInterfaz();
    window.agregarEvento("¡Compraste Estómago Extra! Máx Hambre: 400");
  } else {
    window.agregarEvento("No tienes suficientes monedas (100M necesarias)");
  }
};

window.iniciarTormenta = function() {
  window.eventoTormentaActivo = true;
  if (typeof window.reproducirMusica === 'function') window.reproducirMusica('dark_rain');
  if (typeof window.reproducirSFX === 'function') window.reproducirSFX('pou_gasp');
  window.agregarEvento("¡Una tormenta feroz ha comenzado!");
};

// Chequeo aleatorio de tormenta cada 2 minutos
setInterval(() => {
  if (!window.eventoTormentaActivo && Math.random() < 0.15) {
    window.iniciarTormenta();
  }
}, 120000);

window.guardarPartida = function() {
  localStorage.setItem('partida.pou', JSON.stringify(window.estadoJuego));
  window.agregarEvento("Partida guardada en partida.pou");
};

window.cargarPartida = function() {
  const guardado = localStorage.getItem('partida.pou');
  if (guardado) {
    window.estadoJuego = JSON.parse(guardado);
    window.actualizarInterfaz();
    window.agregarEvento("Partida cargada de partida.pou");
  }
};

document.addEventListener('DOMContentLoaded', () => {
  window.actualizarInterfaz();
});

