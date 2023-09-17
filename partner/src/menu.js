
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
    // Trim white spaces at the beginning and end, and convert to lowercase
    const trimmedAndLowercasedText = inputText.trim().toLowerCase();
  
    let hash = 0;
    for (let i = 0; i < trimmedAndLowercasedText.length; i++) {
      const char = trimmedAndLowercasedText.charCodeAt(i);
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

    // Otherwise, construct url to fetch data
    } else {
        const sheetID = partnersAR[userHash]?.menuId
        const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
        const sheetName = 'carta - plan inicial';
        const qu = 'Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y';
        const query = encodeURIComponent(qu);
        const url = `${base}&sheet=${sheetName}&tq=${query}`;
        const data = [];
        const categoryContainer = document.getElementById('categoriesContainer');
    
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

                // Construct products (Columns A to G)
                for (let i = 0; i < rows.length; i++) {
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
                for (let i = 0; i < rows.length; i++) {
                    const category = rows[i].c[8] && rows[i].c[8].v !== null && rows[i].c[8].v !== undefined && rows[i].c[8].v !== '' ? rows[i].c[8].v : null;
                    // Only push non-empty categories
                    if (category !== null) {
                        Categories.push(category);
                    }
                }

                // Set rotativo en el menú
                const Rotativo = rows[0].c[21].v;
                const rotativoMenuElement = document.getElementById('rotativo')
                rotativoMenuElement.innerText = Rotativo

                // Log the extracted categories
                Categories.forEach((category, index) => {

                    console.log(category)
                    const newCategory = document.createElement('div');
                    newCategory.id = generateHash(category);
                    newCategory.classList.add('responsive-2', 'display-flex', 'flex-col', 'padded', 'no-padded-left', 'no-padded-right');

                    let categoryElement = `
                        <h2 style="background-color: #1B406B;" class="w-fit color-white s-padded font-500 max-width-100 wrap overflow-scroll">
                            ${category}
                        </h2>
                        <div class="productContainer w-100 display-flex flex-col">
                        </div>
                    `
                    newCategory.innerHTML = categoryElement

                    if (categoryContainer) {
                        categoryContainer.appendChild(newCategory);
                    } else {
                        return
                    }
                });


                Products.forEach((Product) => {

                    console.log(Product)

                    const parentDiv = document.getElementById(generateHash(Product.Categoria));
                    if (parentDiv) {
                        // Use querySelector to target the desired element
                        const productContainerDiv = parentDiv.querySelector('.productContainer');
                      
                        if (productContainerDiv) {

                            const newProduct = document.createElement('div');
                            newProduct.classList.add('w-100', 'display-flex', 'flex-row');
                            const estado = (Product.Estado !== 'Disponible' && Product.Estado !== '') ? '' : `<span class='font-s font-400 xs-padded rounded-s bg-black color-white'>${Product.Estado}</span>`

                            
                            let productElement = `
                                <div class="steady-2-of-3 padded display-flex flex-col s-gap">
                                    <h3 class="font-500 max-width-100 wrap overflow-scroll">
                                        ${Product.Plato}
                                        ${estado}
                                    </h3>
                                    <p class="max-width-100 wrap overflow-scroll">
                                        ${Product.Description}
                                    </p>
                                </div>
                                <h3 class="steady-1-of-3 padded text-right display-flex flex-end font-500">
                                    $ ${Product.Precio}
                                </h3>
                            `

                            newProduct.innerHTML = productElement

                            productContainerDiv.appendChild(newProduct);

                        } else {
                            console.log('No element with class "productContainer" found inside the div with id "weso".');
                        }
                    }

                });

            })
    }

})();
