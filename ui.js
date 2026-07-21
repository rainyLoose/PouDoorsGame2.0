// ==========================================
// 📱 INTERFAZ Y NAVEGACIÓN (ui.js)
// ==========================================

window.cambiarPantalla = function(idPantalla) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  const target = document.getElementById(idPantalla);
  if (target) {
    target.classList.add('activa');
  }

  // Música según la pantalla
  if (typeof window.reproducirMusica === 'function') {
    if (idPantalla === 'pantalla-tienda') window.reproducirMusica('EverShop');
    else if (idPantalla === 'pantalla-trofeos') window.reproducirMusica('color_trophies');
    else if (idPantalla === 'pantalla-cocina') window.reproducirMusica('annoyingnighttime');
    else if (idPantalla === 'pantalla-juego') window.reproducirMusica('raining_somewhere');
  }
};

window.volverAlJuego = function() {
  if (typeof window.guardarPartida === 'function') window.guardarPartida();
  window.cambiarPantalla('pantalla-juego');
};

