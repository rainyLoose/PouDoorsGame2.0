// ==========================================
// 📦 ÍTEMS Y COCINA (items.js)
// ==========================================

window.ITEMS = {
  jugo_pina: { nombre: "🧃 Jugo de Piña", precio: 12, hambre: 20, empapacho: 5 },
  jugo_coco: { nombre: "🥥 Jugo de Coco", precio: 15, hambre: 25, empapacho: 8 },
  jugo_mango: { nombre: "🥭 Jugo de Mango", precio: 12, hambre: 20, empapacho: 5 },
  burrito_pizza: { nombre: "🌯 Burrito Pizza", precio: 28, hambre: 60, empapacho: 20 },
  pou_stel: { nombre: "🍰 Pou-stel 3D", precio: 30, hambre: 75, empapacho: 30 },
  paraguas: { nombre: "☔ Paraguas", precio: 50, reduceHumedad: true }
};

window.RECETAS_COCINA = [
  { ingredientes: ['burrito', 'takis'], resultado: 'Burrito de Takis', hambre: 90, empapacho: 35 }
];

