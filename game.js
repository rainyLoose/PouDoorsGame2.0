window.estadoJuego = {
  monedas: 12,
  hambre: 0,
  maxHambre: 250,
  empapacho: 0,
  miedo: 0,
  humedad: 0,
  dia: 1,
  puerta: 0,
  inventario: {}
};

window.actualizarInterfaz = function() {
  const porcHambre = (window.estadoJuego.hambre / window.estadoJuego.maxHambre) * 100;
  
  if (document.getElementById('miedo-val')) document.getElementById('miedo-val').style.width = window.estadoJuego.miedo + '%';
  if (document.getElementById('humedad-val')) document.getElementById('humedad-val').style.width = window.estadoJuego.humedad + '%';
  if (document.getElementById('hambre-val')) document.getElementById('hambre-val').style.width = porcHambre + '%';
  if (document.getElementById('empapacho-val')) document.getElementById('empapacho-val').style.width = window.estadoJuego.empapacho + '%';
  if (document.getElementById('monedas-txt')) document.getElementById('monedas-txt').innerText = window.estadoJuego.monedas;
  if (document.getElementById('hambre-txt')) document.getElementById('hambre-txt').innerText = `${window.estadoJuego.hambre}/${window.estadoJuego.maxHambre}`;
  if (document.getElementById('dia-txt')) document.getElementById('dia-txt').innerText = window.estadoJuego.dia;
  if (document.getElementById('puerta-txt')) document.getElementById('puerta-txt').innerText = window.estadoJuego.puerta;

  window.renderizarInventario();
};

window.agregarEvento = function(texto) {
  const box = document.getElementById('eventos-box');
  if (!box) return;
  const lineas = box.innerHTML.split('<br>').filter(l => l.trim() !== '');
  lineas.unshift('• ' + texto);
  if (lineas.length > 3) lineas.pop();
  box.innerHTML = lineas.join('<br>');
};

// MECÁNICA DE PUERTAS
window.abrirSiguientePuerta = function() {
  window.estadoJuego.puerta++;
  window.estadoJuego.hambre = Math.min(window.estadoJuego.maxHambre, window.estadoJuego.hambre + 10);
  window.estadoJuego.monedas += Math.floor(Math.random() * 10) + 5;
  
  if (window.estadoJuego.puerta % 10 === 0) {
    window.estadoJuego.dia++;
    window.agregarEvento(`¡Avanzaste al Día ${window.estadoJuego.dia}!`);
  } else {
    window.agregarEvento(`Cruzaste a la Puerta ${window.estadoJuego.puerta}`);
  }
  
  window.actualizarInterfaz();
};

// COMPRAR Y USAR ÍTEMS
window.comprarItem = function(idItem) {
  const item = window.ITEMS[idItem];
  if (!item) return;

  if (window.estadoJuego.monedas >= item.precio) {
    window.estadoJuego.monedas -= item.precio;
    window.estadoJuego.inventario[idItem] = (window.estadoJuego.inventario[idItem] || 0) + 1;
    if (typeof window.reproducirSFX === 'function') window.reproducirSFX('comprar');
    window.agregarEvento(`Compraste ${item.nombre}`);
    window.actualizarInterfaz();
  } else {
    window.agregarEvento("No tienes suficientes monedas.");
  }
};

window.usarItem = function(idItem) {
  const item = window.ITEMS[idItem];
  if (!item || !window.estadoJuego.inventario[idItem]) return;

  window.estadoJuego.inventario[idItem]--;
  if (window.estadoJuego.inventario[idItem] <= 0) {
    delete window.estadoJuego.inventario[idItem];
  }

  if (item.hambre) {
    window.estadoJuego.hambre = Math.max(0, window.estadoJuego.hambre + item.hambre);
  }
  if (item.empapacho) {
    window.estadoJuego.empapacho = Math.min(100, window.estadoJuego.empapacho + item.empapacho);
  }
  if (item.reduceHumedad) {
    window.estadoJuego.humedad = 0;
  }

  if (typeof window.reproducirSFX === 'function') window.reproducirSFX('comer');
  window.agregarEvento(`Usaste ${item.nombre}`);
  window.actualizarInterfaz();
};

window.renderizarInventario = function() {
  const cont = document.getElementById('lista-inventario');
  if (!cont) return;

  const llaves = Object.keys(window.estadoJuego.inventario);
  if (llaves.length === 0) {
    cont.innerHTML = '<p>Tu inventario está vacío.</p>';
    return;
  }

  cont.innerHTML = '';
  llaves.forEach(id => {
    const cantidad = window.estadoJuego.inventario[id];
    const item = window.ITEMS[id];
    if (item && cantidad > 0) {
      const div = document.createElement('div');
      div.className = 'item-card';
      div.innerHTML = `
        <span>${item.nombre} x${cantidad}</span>
        <button onclick="usarItem('${id}')">Usar / Comer</button>
      `;
      cont.appendChild(div);
    }
  });
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
    window.agregarEvento("¡Estómago Extra! Máx Hambre: 400");
  } else {
    window.agregarEvento("Requiere 100 Monedas.");
  }
};

// SISTEMA DE ARCHIVOS REAL .POU
window.descargarArchivoPou = function() {
  const data = JSON.stringify(window.estadoJuego, null, 2);
  const blob = new Blob([data], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'partida.pou';
  a.click();
  URL.revokeObjectURL(a.href);
  window.agregarEvento("Archivo partida.pou descargado.");
};

window.cargarArchivoPou = function(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const parsed = JSON.parse(e.target.result);
      window.estadoJuego = parsed;
      window.actualizarInterfaz();
      window.agregarEvento("¡Partida .pou cargada con éxito!");
    } catch (err) {
      window.agregarEvento("Error: El archivo .pou no es válido.");
    }
  };
  reader.readAsText(file);
};

document.addEventListener('DOMContentLoaded', () => {
  window.actualizarInterfaz();
});
