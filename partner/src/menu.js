
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
    const trimmedAndLowercasedText = inputText.trim().toLowerCase();

    let hash = 0;
    for (let i = 0; i < trimmedAndLowercasedText.length; i++) {
        const char = trimmedAndLowercasedText.charCodeAt(i);
        hash = (hash << 5) - hash + char;
    }

    // Take the absolute value to ensure it's non-negative
    hash = Math.abs(hash);

    return hash.toString();
}
  

(function () {

    // Extract userName from URL stored in local storage and convert to Hash to match to see if exist in Partners List
    const storedURL = localStorage.getItem('currentUrl');

    if (!storedURL){
        window.location.href = "https://yendo.delivery/partner";
    }
    const userName = extractUserFromUrl(storedURL)
    const userHash = generateHash(userName)

    // If it doesnt match any partner redirect to main page
    if (!partnersAR[userHash]){
        window.location.href = "https://yendo.delivery/partner";

    // Otherwise, construct url to fetch data
    } else {
        const sheetID = partnersAR[userHash]?.menuId
        const partnerTintColor = partnersAR[userHash]?.tintColor
        const partnerAccentColor = partnersAR[userHash]?.accentColor
        const partnerContrastColor = partnersAR[userHash]?.contrastColor
        const partnerStyle = partnersAR[userHash]?.partnerStyle
        const partnerThemeMode = partnersAR[userHash]?.theme
        const partnerTellerForm = partnersAR[userHash]?.tellerForm
        const wspNumber = partnersAR[userHash]?.wspNumber
        const partnerFontFamily = partnersAR[userHash]?.fontFamily
        const coverMenu = `https://yendo.delivery/partner/src/users/img/${userName}-portada.jpg`
        const profilePictureMenu = `https://yendo.delivery/partner/src/users/img/${userName}-profile.jpg`
        const base = `https://docs.google.com/spreadsheets/d/${sheetID}/gviz/tq?`;
        const sheetName = 'carta - plan inicial';
        const qu = 'Select A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y';
        const query = encodeURIComponent(qu);
        const url = `${base}&sheet=${sheetName}&tq=${query}`;
        const data = [];
        const categoryContainer = document.getElementById('categoriesContainer');
        const categoriesDirectAccessContainer = document.getElementById('categoriesDirectAccessContainer');
    
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
                function changeImage() {
                    const portadaImage = document.getElementById('portadaMenu');
                    const profileImage = document.getElementById('profilePicture');
                    portadaImage.src = coverMenu;
                    profileImage.src = profilePictureMenu;
                }
                changeImage()


                function setWspButton() {
                    // Get a reference to the anchor element with the specified ID
                    const partnerWspLink = document.getElementById('partnerWspNumber');
                  
                    // Update the href attribute to a new URL
                    partnerWspLink.href = `https://wa.me/${wspNumber}`;  // Replace with the desired URL
                }setWspButton()
                

                function setBackgroundColor() {
                    let rotativoContainer = document.getElementById('rotativoContainer')

                    // Set the background color of the body
                    document.body.style.backgroundColor = partnerContrastColor;
                    
                    // Set color of rotativo container
                    
                    if (partnerStyle == 'modern'){
                        rotativoContainer.style.backgroundColor = partnerAccentColor;
                        rotativoContainer.style.boxShadow = '0 10px 8px ' + partnerAccentColor;
                    } 
                    if (partnerStyle == 'classic'){
                        rotativoContainer.style.backgroundColor = partnerContrastColor;
                    }
                    
                }setBackgroundColor()

                // Set rotativo en el menú
                const Rotativo = rows[0].c[21].v;
                const rotativoMenuElement = document.getElementById('rotativo')
                let rotation = `
                <span style='color: ${partnerTintColor}' class="horizontal-scrolling-items__item">
                    ${Rotativo}&nbsp-&nbsp
                </span>
                
                <span style='color: ${partnerTintColor}' class="horizontal-scrolling-items__item">
                    ${Rotativo}&nbsp-&nbsp
                </span>
                
                <span style='color: ${partnerTintColor}' class="horizontal-scrolling-items__item">
                    ${Rotativo}&nbsp-&nbsp
                </span>
                
                <span style='color: ${partnerTintColor}' class="horizontal-scrolling-items__item">
                    ${Rotativo}&nbsp-&nbsp
                </span>
                
                <span style='color: ${partnerTintColor}' class="horizontal-scrolling-items__item">
                    ${Rotativo}&nbsp-&nbsp
                </span>
                ` 
                rotativoMenuElement.innerHTML = rotation;
                

                // Log the extracted categories
                Categories.forEach((category, index) => {

                    let categoryHash = generateHash(category)

                    const newCategoryAccessButton = document.createElement('a')
                    newCategoryAccessButton.classList.add('s-padded', 'decoration-none', 'no-wrap');
                    newCategoryAccessButton.setAttribute('href', ('#'+categoryHash))
                    newCategoryAccessButton.innerText = category;
                    newCategoryAccessButton.style.backgroundColor = partnerTintColor;
                    newCategoryAccessButton.style.color = partnerContrastColor;

                    const newCategory = document.createElement('div');
                    newCategory.id = categoryHash
                    newCategory.classList.add('l-gap', 'responsive-2', 'display-flex', 'flex-col', 'padded');

                    let categoryElement = `
                        <h3 style="background-color: ${partnerTintColor}; color: ${partnerContrastColor}" class="w-fit s-padded font-500 max-width-100 wrap overflow-scroll">
                            ${category}
                        </h3>
                        <div class="productContainer w-100 display-flex flex-col l-gap">
                        </div>
                    `
                    newCategory.innerHTML = categoryElement

                    if (categoryContainer) {
                        categoryContainer.appendChild(newCategory);
                        categoriesDirectAccessContainer.appendChild(newCategoryAccessButton);
                    } else {
                        return
                    }
                });


                Products.forEach((Product) => {
                    const parentDiv = document.getElementById(generateHash(Product.Categoria));
                    if (parentDiv) {
                        // Use querySelector to target the desired element
                        const productContainerDiv = parentDiv.querySelector('.productContainer');
                      
                        if (productContainerDiv) {

                            const newProduct = document.createElement('div');
                            newProduct.classList.add('w-100', 'display-flex', 'flex-row');

                            // Constructor de etiquetas de estados
                            function labelConstructorByStyle(a){
                                if (partnerStyle == 'classic'){
                                    return `<span style='color: ${partnerAccentColor}' class='font-300'> [${a}]</span>`
                                }
                                if (partnerStyle == 'modern'){
                                    return `<small style='color: ${partnerContrastColor}; background-color: ${partnerAccentColor}' class='font-400 xs-padded'> ${a}</small>`
                                }
                            }

                            const estado = (Product.Estado !== 'Disponible' && Product.Estado !== '') ? labelConstructorByStyle(Product.Estado) : ''

                            
                            let productElement = `
                                <div style='color: ${partnerTintColor}' class="w-100 display-flex flex-col xs-gap">
                                    <div class='display-flex h-bottom flex-row spaced'>
                                        <h3 class="font-600 width-fit wrap overflow-scroll">
                                            ${Product.Plato}
                                            ${estado}
                                        </h3>
                                        <h4 class="steady-33 text-right display-flex flex-end font-300">
                                            ${Product.Precio}
                                        </h4>
                                    </div>
                                    <div style='border-color: ${partnerTintColor};' class='border-solid'></div>
                                    <p class="font-300 max-width-100 wrap overflow-scroll">
                                        ${Product.Description}
                                    </p>
                                </div>
                                
                            `

                            newProduct.innerHTML = productElement

                            productContainerDiv.appendChild(newProduct);

                        } else {
                            console.log('No element with class "productContainer" found inside the div with id "weso".');
                        }
                    }

                });

                function addTellerElement() {
                    if (partnerTellerForm === '') {return} else {
                        // Crea un elemento div
                        var divElement = document.createElement('div');
                    
                        // Crea un elemento teller
                        var tellerElement = document.createElement('teller');
                        
                        // Configura los atributos
                        tellerElement.setAttribute('style', 'bottom: 20px !important; left: 20px !important;');
                        tellerElement.setAttribute('lang', 'en');
                        tellerElement.setAttribute('supportHours', '09:00/13:59(-03:00)');
                        tellerElement.setAttribute('username', 'Teller by Unirvana');
                        tellerElement.setAttribute('tellerMode', 'brick');
                        tellerElement.setAttribute('userColor', partnerTintColor);
                        tellerElement.setAttribute('theme', partnerThemeMode);
                        tellerElement.setAttribute('side', 'left');
                        tellerElement.setAttribute('borderRadius', '25');
                        tellerElement.setAttribute('appearAfter', '5');
                        tellerElement.setAttribute('callToAction', 'Compartanos su experiencia');
                        tellerElement.setAttribute('formUrl', partnerTellerForm);
                    
                        // Agrega el elemento teller al div
                        divElement.appendChild(tellerElement);
                    
                        // Agrega el div al DOM
                        document.body.appendChild(divElement);
                        teller()
                        }
                }addTellerElement()

                function setFontFamily() {
                    // Set the font-family for the body to 'Urbanist'
                    document.body.style.fontFamily = partnerFontFamily;
                }setFontFamily()

                
                

            })
    }

})();
