// Function to extract the username from the url entered by the user
function extractUserFromUrl(url) {
    const regex = /\/partner\/([^\/]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return match[1];
    }
    return null;
}

// Function to generate a simple and non secure at all hash
function generateHash(inputText) {
  let hash = 0;
  for (let i = 0; i < inputText.length; i++) {
    const char = inputText.charCodeAt(i);
    hash = (hash << 5) - hash + char;
  }
  return hash.toString();
}

(function () {

    // Extract userName from URL stored in local storage and convert to Hash to match to see if exist in Partners List
    const storedURL = localStorage.getItem('currentUrl');
    const userName = extractUserFromUrl(storedURL)
    const userHash = generateHash(userName)

    // If it doesnt match any partner redirect to main page
    if (!partnersAR[userHash]){
        window.location.href = "https://yendo.delivery/partner";

    // Otherwise 'joyi', construct url to fetch data
    } else {
        const sheetID = partnersAR[userHash]?.menuId
        const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
        const sheetName = 'carta - plan inicial';
        const qu = 'Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y';
        const query = encodeURIComponent(qu);
        const url = `${base}&sheet=${sheetName}&tq=${query}`;
        const data = [];
    
        // Fetch menu from user
        fetch(url)
            .then(res => res.text())
            .then(rep => {
                const jsData = JSON.parse(rep.substr(47).slice(0, -2));

                // Obtener todas las filas de la hoja de cálculo
                const rows = jsData.table.rows;

                // Inicializar arrays
                const Products = [];
                const Categories = [];
                const Rotativo = rows[1].c[22]?.v;

                // Construct products (Columns A to G)
                for (let i = 1; i < rows.length; i++) {
                    const row = rows[i];
                    const Product = {
                        SKU: row.c[0] && row.c[0].v ? row.c[0].v : '',
                        Categoria: row.c[1] && row.c[1].v ? row.c[1].v : '',
                        Plato: row.c[2] && row.c[2].v ? row.c[2].v : '', 
                        Description: row.c[3] && row.c[3].v ? row.c[3].v : '', 
                        Precio: row.c[4] && row.c[4].v ? row.c[4].v : '', 
                        Descuento: row.c[5] && row.c[5].v ? row.c[5].v : '', 
                        Estado: row.c[6] && row.c[6].v ? row.c[6].v : '', 
                        };
                        Products.push(Product);
                }

                // Construct Categories Array (Column I)
                for (let i = 1; i < rows.length; i++) {
                    const category = rows[i].c[8] && rows[i].c[8].v !== null && rows[i].c[8].v !== undefined && rows[i].c[8].v !== '' ? rows[i].c[8].v : null;

                    // Only push non-empty categories
                    if (category !== null) {
                        Categories.push(category);
                    }
                }

                // Set rotativo en el menú
                function setRotativo() {
                    const rotativoMenuElement = document.getElementById('rotativo')
                    rotativoMenuElement.innerText = Rotativo
                }
                setRotativo()
                

                Products.forEach((Products) => {
                    console.log('SKU:', Products.SKU);
                    console.log('Categoría:', Products.Categoria);
                    console.log('Plato:', Products.Plato);
                });

                // Log the extracted categories
                Categories.forEach((category, index) => {
                    console.log(`Category ${index + 1}: ${category}`);
                });

            })
    }

})();
