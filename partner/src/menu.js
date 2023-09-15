const sheetID = '1vF3AkCM5jxXWHg-U1h_Bi2orQdc2_uBNGIJgIcX64EE';
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

                        // Obtener todas las filas de la hoja de cálculo
                        const rows = jsData.table.rows;

                        // Inicializar un array para almacenar los objetos de SKU
                        const skuObjects = [];
                        const Categories = [];
                        const States = [];
                        const invervalHours = [];

                        // Products constructor
                        for (let i = 1; i < rows.length; i++) {
                            console.log('wep')
                        const row = rows[i];
                            
                                const skuObject = {
                                SKU: row.c[0].v,
                                Categoria: row.c[1] ? row.c[1].v : '',
                                Plato: row.c[2] ? row.c[2].v : '', 
                                Description: row.c[3] ? row.c[3].v : '', 
                                Precio: row.c[4] ? row.c[4].v : '', 
                                Descuento: row.c[5] ? row.c[5].v : '', 
                                Estado: row.c[6] ? row.c[6].v : '', 
                                };
                                skuObjects.push(skuObject);
                            
                        }

                        // Product iterator example
                        skuObjects.forEach((skuObject) => {
                        console.log('SKU:', skuObject.SKU);
                        console.log('Categoría:', skuObject.Categoria);
                        console.log('Plato:', skuObject.Plato);
                        // Agrega otras propiedades según tus necesidades
                        });

        })
}
