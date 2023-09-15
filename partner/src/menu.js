function generateHash(inputText) {
  let hash = 0;
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash.toString();
}

const sheetID = '1vF3AkCM5jxXWHg-U1h_Bi2orQdc2_uBNGIJgIcX64EE';
const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
const sheetName = 'carta - plan inicial';
let qu = 'Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y';
const query = encodeURIComponent(qu);
const url = `${base}&sheet=${sheetName}&tq=${query}`;
const data = [];

(function () {
    
    fetch(url)
        .then(res => res.text())
        .then(rep => {
            const jsData = JSON.parse(rep.substr(47).slice(0, -2));

            // Obtener todas las filas de la hoja de cálculo
            const rows = jsData.table.rows;

            // Inicializar arrays
            const Products = [];
            const Categories = [];
            const States = [];
            const invervalHours = [];

            // Construct products
            for (let i = 1; i < rows.length; i++) {
                const row = rows[i];
                const Products = {
                    SKU: row.c[0] && row.c[0].v ? row.c[0].v : '',
                    Categoria: row.c[1] && row.c[1].v ? row.c[1].v : '',
                    Plato: row.c[2] && row.c[2].v ? row.c[2].v : '', 
                    Description: row.c[3] && row.c[3].v ? row.c[3].v : '', 
                    Precio: row.c[4] && row.c[4].v ? row.c[4].v : '', 
                    Descuento: row.c[5] && row.c[5].v ? row.c[5].v : '', 
                    Estado: row.c[6] && row.c[6].v ? row.c[6].v : '', 
                    };
                    Products.push(Products);
            }

            // 

            Products.forEach((Products) => {
                console.log('SKU:', Products.SKU);
                console.log('Categoría:', Products.Categoria);
                console.log('Plato:', Products.Plato);
            });

        })

})();
