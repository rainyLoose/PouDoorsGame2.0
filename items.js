window.ITEMS = {
  jugo_pina: { id: 'jugo_pina', nombre: "🧃 Jugo de Piña", precio: 12, hambre: -20, empapacho: 5 },
  jugo_coco: { id: 'jugo_coco', nombre: "🥥 Jugo de Coco", precio: 15, hambre: -25, empapacho: 8 },
  jugo_mango: { id: 'jugo_mango', nombre: "🥭 Jugo de Mango", precio: 12, hambre: -20, empapacho: 5 },
  burrito_pizza: { id: 'burrito_pizza', nombre: "🌯 Burrito Pizza", precio: 28, hambre: -60, empapacho: 20 },
  pou_stel: { id: 'pou_stel', nombre: "🍰 Pou-stel 3D", precio: 30, hambre: -75, empapacho: 30 },
  paraguas: { id: 'paraguas', nombre: "☔ Paraguas", precio: 50, reduceHumedad: true }
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
