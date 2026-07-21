// ==========================================
// NAVEGACIÓN Y PANTALLAS (UI)
// ==========================================

function cambiarPantalla(hash) {
  // Guardar automáticamente para no perder nada
  guardarPartida();
  window.location.hash = hash;
}

function volverAlJuego() {
  guardarPartida();
  window.location.hash = ''; // Regresa al juego principal
  reproducirMusica('raining_somewhere'); // Vuelve la música normal
}

// Escuchar cambios de URL/Hash sin recargar
window.addEventListener('hashchange', () => {
  const ruta = window.location.hash;

  if (ruta === '#/tienda') {
    reproducirMusica('EverShop');
    // Mostrar HTML de tienda
  } else if (ruta === '#/trofeos') {
    reproducirMusica('color_trophies');
    // Mostrar HTML de trofeos
  } else if (ruta === '#/cocina') {
    reproducirMusica('annoyingnighttime');
    // Mostrar HTML de cocina
  } else {
    // Pantalla Principal
  }
});
