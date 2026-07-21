// ==========================================
// ITÉMS, TIENDA Y COCINA
// ==========================================

const ITEMS = {
  // --- TIENDA DE COMIDAS & BEBIDAS ---
  "jugo_pina": { nombre: "Jugo de Piña", precio: 12, hambre: -15, humedad: -5, miedo: -5 },
  "jugo_coco": { nombre: "Jugo de Coco", precio: 15, hambre: -18, humedad: -10, miedo: -5 },
  "jugo_mango": { nombre: "Jugo de Mango", precio: 12, hambre: -15, humedad: -5, miedo: -5 },
  "mango_cortado": { nombre: "Mango Cortado", precio: 10, hambre: -15, humedad: 0, miedo: -5 },
  "caldo_vegetales": { nombre: "Caldo de Vegetales", precio: 22, hambre: -35, humedad: -20, miedo: -10 },
  "burrito_pizza": { nombre: "Burrito de Pizza", precio: 28, hambre: -45, humedad: 0, miedo: -10 },
  "burrito": { nombre: "Burrito", precio: 20, hambre: -35, humedad: 0, miedo: 0 },
  "caldo": { nombre: "Caldo", precio: 15, hambre: -25, humedad: -15, miedo: 0 },
  "manzana": { nombre: "Manzana", precio: 5, hambre: -10, humedad: 0, miedo: 0 },
  "platano": { nombre: "Plátano", precio: 8, hambre: -15, humedad: 0, miedo: 0 },
  "paraguas": { nombre: "Paraguas", precio: 50, tipo: "equipable" },

  // --- ESPECIAL 4.0 ---
  "poustel_3d": { 
    nombre: "Pou-stel 3D", 
    precio: 30, 
    hambreBase: -50, 
    porciones: 8, 
    hambrePorcion: -25 
  }
};

// Mecánica de Cocinar (Máximo 5 ítems)
function cocinar(ingredientesArray) {
  if (ingredientesArray.length > 5) {
    SFX.no.play();
    return null;
  }

  const receta = ingredientesArray.sort().join('+');

  switch (receta) {
    case 'burrito+takis':
      SFX.trak.play();
      return 'Burrito de Takis';
    case 'caldo+takis':
      SFX.trak.play();
      return 'Caldo de Takis';
    case 'platano':
      SFX.trak.play();
      return 'Plátano Frito';
    default:
      SFX.pou_confused.play();
      return 'Comida Quemada';
  }
}
