const sheetID = '1CoqgRxK1WOkYsdZ6SPAUl9iWN2fEKm27TpzJ8YBvuLY';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'carta - plan inicial';
let qu = 'Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T';
const query = encodeURIComponent(qu);
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];
document.addEventListener('DOMContentLoaded', init);

const output = document.querySelector('.output');

function init() {
    console.log('ready');
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsData = JSON.parse(rep.substr(47).slice(0, -2));
            console.log(jsData);

            const rows = jsData.table.rows;

// Inicializar un array para almacenar los objetos de SKU
const skuObjects = [];

// Iterar a través de las filas para construir objetos para cada SKU
for (const row of rows) {
  if (row.c && row.c[0] && row.c[0].v) {
    const skuObject = {
      SKU: row.c[0].v,
      Categoria: row.c[1] ? row.c[1].v : '', // Comprueba si la columna B existe
      Plato: row.c[2] ? row.c[2].v : '', // Comprueba si la columna C existe
      // Agrega otras propiedades según tus necesidades
    };
    skuObjects.push(skuObject);
  }
}

// skuObjects ahora contiene objetos para cada SKU
// Puedes acceder a las propiedades como skuObject.SKU, skuObject.Categoria, skuObject.Plato, etc.

// Ejemplo de cómo imprimir la categoría y el plato para cada SKU
skuObjects.forEach((skuObject) => {
  console.log('SKU:', skuObject.SKU);
  console.log('Categoría:', skuObject.Categoria);
  console.log('Plato:', skuObject.Plato);
  // Agrega otras propiedades según tus necesidades
});

        })
}
