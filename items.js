// ==========================================
// 🍎 ÍTEMS, TIENDA Y COCINA (items.js)
// ==========================================

window.ITEMS = {
  // --- BEBIDAS ---
  jugo_pina: { id: 'jugo_pina', nombre: "🧃 Jugo de Piña", precio: 12, hambre: -15, humedad: -5, miedo: -5, empapacho: 5 },
  jugo_coco: { id: 'jugo_coco', nombre: "🥥 Jugo de Coco", precio: 15, hambre: -18, humedad: -10, miedo: -5, empapacho: 8 },
  jugo_mango: { id: 'jugo_mango', nombre: "🥭 Jugo de Mango", precio: 12, hambre: -15, humedad: -5, miedo: -5, empapacho: 5 },

  // --- COMIDAS & FRUTAS ---
  mango_cortado: { id: 'mango_cortado', nombre: "🥭 Mango Cortado", precio: 10, hambre: -15, empapacho: 5 },
  manzana: { id: 'manzana', nombre: "🍎 Manzana", precio: 5, hambre: -10, empapacho: 3 },
  platano: { id: 'platano', nombre: "🍌 Plátano", precio: 8, hambre: -15, empapacho: 4 },
  caldo: { id: 'caldo', nombre: "🍲 Caldo", precio: 15, hambre: -25, humedad: -15, empapacho: 10 },
  caldo_vegetales: { id: 'caldo_vegetales', nombre: "🥦 Caldo de Vegetales", precio: 22, hambre: -35, humedad: -20, miedo: -10, empapacho: 15 },
  burrito: { id: 'burrito', nombre: "🌯 Burrito", precio: 20, hambre: -35, empapacho: 15 },
  burrito_pizza: { id: 'burrito_pizza', nombre: "🌯 Burrito Pizza", precio: 28, hambre: -45, miedo: -10, empapacho: 20 },

  // --- ÍTEMS ESPECIALES POU ---
  sopa_pou: { id: 'sopa_pou', nombre: "🍲 Sopa Pou", precio: 18, hambre: -30, humedad: -10, empapacho: 8 },
  hamburguesa_pou: { id: 'hamburguesa_pou', nombre: "🍔 Hamburguesa Pou", precio: 25, hambre: -50, empapacho: 20 },
  sandwich_pou: { id: 'sandwich_pou', nombre: "🥪 Sándwich Pou", precio: 16, hambre: -25, empapacho: 10 },
  takis_pou: { id: 'takis_pou', nombre: "🌶️ Takis Pou", precio: 14, hambre: -20, miedo: -15, empapacho: 12 },

  // --- POSTRES Y UTENSILIOS ---
  poustel_3d: { id: 'poustel_3d', nombre: "🍰 Pou-stel 3D", precio: 30, hambre: -75, empapacho: 30 },
  paraguas: { id: 'paraguas', nombre: "☔ Paraguas", precio: 50, reduceHumedad: true, tipo: "equipable" }
};

// Mecánica de Cocinar (Combinar hasta 5 ingredientes)
window.cocinar = function(ingredientesArray) {
  if (!ingredientesArray || ingredientesArray.length > 5) {
    if (typeof window.reproducirSFX === 'function') window.reproducirSFX('no');
    return null;
  }

  const receta = ingredientesArray.sort().join('+');

  switch (receta) {
    case 'burrito+takis_pou':
      if (typeof window.reproducirSFX === 'function') window.reproducirSFX('trak');
      return 'Burrito de Takis';
    case 'caldo+takis_pou':
      if (typeof window.reproducirSFX === 'function') window.reproducirSFX('trak');
      return 'Caldo de Takis';
    case 'platano':
      if (typeof window.reproducirSFX === 'function') window.reproducirSFX('trak');
      return 'Plátano Frito';
    default:
      if (typeof window.reproducirSFX === 'function') window.reproducirSFX('pou_confused');
      return 'Comida Quemada';
  }
};

window.renderizarTienda = function() {
  const cont = document.getElementById('lista-tienda');
  if (!cont) return;
  cont.innerHTML = '';
  
  Object.values(window.ITEMS).forEach(item => {
    const div = document.createElement('div');
    div.className = 'item-card';
    div.innerHTML = `
      <span>${item.nombre} (${item.precio}M)</span>
      <button onclick="comprarItem('${item.id}')">Comprar</button>
    `;
    cont.appendChild(div);
  });
};

document.addEventListener('DOMContentLoaded', () => {
  if (window.renderizarTienda) window.renderizarTienda();
});
