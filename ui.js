// NAVEGACIÓN Y MANEJO DE PANTALLAS
window.cambiarPantalla = function(idPantalla) {
  document.querySelectorAll('.pantalla').forEach(p => p.classList.remove('activa'));
  const target = document.getElementById(idPantalla);
  if(target) {
    target.classList.add('activa');
  }
  
  if (typeof reproducirMusica === 'function') {
    if (idPantalla === 'pantalla-tienda') reproducirMusica('EverShop');
    else if (idPantalla === 'pantalla-trofeos') reproducirMusica('color_trophies');
    else if (idPantalla === 'pantalla-cocina') reproducirMusica('annoyingnighttime');
  }
};

window.volverAlJuego = function() {
  if (typeof guardarPartida === 'function') guardarPartida();
  window.cambiarPantalla('pantalla-juego');
  if (typeof reproducirMusica === 'function') reproducirMusica('raining_somewhere');
};
