let estadoJuego = {
  monedas: 100,
  hambre: 0,
  maxHambre: 250,
  empapacho: 0,
  miedo: 0,
  humedad: 0,
  inventario: []
};

let eventoTormentaActivo = false;

window.actualizarInterfaz = function() {
  const porcHambre = (estadoJuego.hambre / estadoJuego.maxHambre) * 100;
  
  document.getElementById('miedo-val').style.width = estadoJuego.miedo + '%';
  document.getElementById('humedad-val').style.width = estadoJuego.humedad + '%';
  document.getElementById('hambre-val').style.width = porcHambre + '%';
  document.getElementById('empapacho-val').style.width = estadoJuego.empapacho + '%';
  document.getElementById('monedas-txt').innerText = estadoJuego.monedas;
  document.getElementById('hambre-txt').innerText = `${estadoJuego.hambre}/${estadoJuego.maxHambre}`;
};

window.agregarEvento = function(texto) {
  const box = document.getElementById('eventos-box');
  if(!box) return;
  const lineas = box.innerHTML.split('<br>').filter(l => l.trim() !== '');
  lineas.unshift('• ' + texto);
  if (lineas.length > 3) lineas.pop();
  box.innerHTML = lineas.join('<br>');
};

window.comprarEstomagoExtra = function() {
  if (estadoJuego.monedas >= 100) {
    if (estadoJuego.maxHambre >= 400) {
      window.agregarEvento("¡Ya tienes la capacidad máxima (400)!");
      return;
    }
    estadoJuego.monedas -= 100;
    estadoJuego.maxHambre = 400;
    window.actualizarInterfaz();
    window.agregarEvento("¡Compraste Estómago Extra! Máx Hambre: 400");
  } else {
    window.agregarEvento("No tienes suficientes monedas (100M necesarias)");
  }
};

window.guardarPartida = function() {
  localStorage.setItem('partida.pou', JSON.stringify(estadoJuego));
  window.agregarEvento("Partida guardada correctamente");
};

window.cargarPartida = function() {
  const guardado = localStorage.getItem('partida.pou');
  if (guardado) {
    estadoJuego = JSON.parse(guardado);
    window.actualizarInterfaz();
    window.agregarEvento("Partida cargada de partida.pou");
  }
};

// Auto-guardado inicial / render
document.addEventListener('DOMContentLoaded', () => {
  window.cargarPartida();
});
