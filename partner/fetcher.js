const sheetID = '1CoqgRxK1WOkYsdZ6SPAUl9iWN2fEKm27TpzJ8YBvuLY';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'yendo - plan inicial';
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
            //console.log(rep);
            const jsData = JSON.parse(rep.substr(47).slice(0, -2));
            console.log(jsData);
            // Obtener todas las filas de la hoja de cálculo
const rows = jsData.table.rows;

// Inicializar un array para almacenar los SKU
const skuArray = [];

// Iterar a través de las filas para extraer los SKU de la columna A
for (const row of rows) {
  if (row.c && row.c[0] && row.c[0].v) {
    const sku = row.c[0].v; // La columna A es la primera (índice 0)
    skuArray.push(sku);
  }
}

// skuArray ahora contiene todos los SKU
console.log(skuArray);
        })
}
