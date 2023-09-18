
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

                // Log the extracted categories
                Categories.forEach((category, index) => {

                    console.log(category)
                    const newCategory = document.createElement('div');
                    newCategory.id = generateHash(category);
                    newCategory.classList.add('responsive-2', 'display-flex', 'flex-col', 'padded', 'm-gap');

                    let categoryElement = `
                        <h2 style="background-color: #1B406B;" class="w-fit color-white s-padded font-500 max-width-100 wrap overflow-scroll">
                            ${category}
                        </h2>
                        <div class="productContainer w-100 display-flex flex-col l-gap">
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
                            const estado = (Product.Estado !== 'Disponible' && Product.Estado !== '') ? `<span class='font-300 rounded-s'> [${Product.Estado}]</span>` : ''

                            
                            let productElement = `
                                <div style='color: #1B406B' class="w-100 display-flex flex-col xs-gap">
                                    <div class='display-flex h-bottom flex-row spaced'>
                                        <h3 class="font-600 width-fit wrap overflow-scroll">
                                            ${Product.Plato}
                                            ${estado}
                                        </h3>
                                        <h4 class="steady-1-of-3 text-right display-flex flex-end font-300">
                                            ${Product.Precio}
                                        </h4>
                                    </div>
                                    <div style='border-color: #1B406B;' class='border-solid'></div>
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





















                                // Set rotativo en el menú
                                const Rotativo = rows[0].c[21].v;
                                const rotativoMenuElement = document.getElementById('rotativo')
                                
                                console.clear();
                                
                
                gsap.utils.toArray(".stb_line_single").forEach((line, i) => {
                  const speed = 2; // (in pixels per second)
                
                  const links = line.querySelectorAll(".stb-item"),
                    tl = horizontalLoop(links, { speed: speed, reversed: true, repeat: -1 });
                
                  links.forEach((link) => {
                    link.addEventListener("mouseenter", () =>
                      gsap.to(tl, { timeScale: 0, overwrite: true })
                    );
                    link.addEventListener("mouseleave", () =>
                      gsap.to(tl, { timeScale: -1, overwrite: true })
                    );
                  });
                });
                
                function horizontalLoop(items, config) {
                  items = gsap.utils.toArray(items);
                  config = config || {};
                  let tl = gsap.timeline({
                      repeat: config.repeat,
                      paused: config.paused,
                      defaults: { ease: "none" },
                      onReverseComplete: () => tl.totalTime(tl.rawTime() + tl.duration() * 100)
                    }),
                    length = items.length,
                    startX = items[0].offsetLeft,
                    times = [],
                    widths = [],
                    xPercents = [],
                    curIndex = 0,
                    pixelsPerSecond = (config.speed || 1) * 100,
                    snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
                    totalWidth,
                    curX,
                    distanceToStart,
                    distanceToLoop,
                    item,
                    i;
                  gsap.set(items, {
                    // convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
                    xPercent: (i, el) => {
                      let w = (widths[i] = parseFloat(gsap.getProperty(el, "width", "px")));
                      xPercents[i] = snap(
                        (parseFloat(gsap.getProperty(el, "x", "px")) / w) * 100 +
                          gsap.getProperty(el, "xPercent")
                      );
                      return xPercents[i];
                    }
                  });
                  gsap.set(items, { x: 0 });
                  totalWidth =
                    items[length - 1].offsetLeft +
                    (xPercents[length - 1] / 100) * widths[length - 1] -
                    startX +
                    items[length - 1].offsetWidth *
                      gsap.getProperty(items[length - 1], "scaleX") +
                    (parseFloat(config.paddingRight) || 0);
                  for (i = 0; i < length; i++) {
                    item = items[i];
                    curX = (xPercents[i] / 100) * widths[i];
                    distanceToStart = item.offsetLeft + curX - startX;
                    distanceToLoop =
                      distanceToStart + widths[i] * gsap.getProperty(item, "scaleX");
                    tl.to(
                      item,
                      {
                        xPercent: snap(((curX - distanceToLoop) / widths[i]) * 100),
                        duration: distanceToLoop / pixelsPerSecond
                      },
                      0
                    )
                      .fromTo(
                        item,
                        {
                          xPercent: snap(
                            ((curX - distanceToLoop + totalWidth) / widths[i]) * 100
                          )
                        },
                        {
                          xPercent: xPercents[i],
                          duration:
                            (curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
                          immediateRender: false
                        },
                        distanceToLoop / pixelsPerSecond
                      )
                      .add("label" + i, distanceToStart / pixelsPerSecond);
                    times[i] = distanceToStart / pixelsPerSecond;
                  }
                  function toIndex(index, vars) {
                    vars = vars || {};
                    Math.abs(index - curIndex) > length / 2 &&
                      (index += index > curIndex ? -length : length); // always go in the shortest direction
                    let newIndex = gsap.utils.wrap(0, length, index),
                      time = times[newIndex];
                    if (time > tl.time() !== index > curIndex) {
                      // if we're wrapping the timeline's playhead, make the proper adjustments
                      vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) };
                      time += tl.duration() * (index > curIndex ? 1 : -1);
                    }
                    curIndex = newIndex;
                    vars.overwrite = true;
                    return tl.tweenTo(time, vars);
                  }
                  tl.next = (vars) => toIndex(curIndex + 1, vars);
                  tl.previous = (vars) => toIndex(curIndex - 1, vars);
                  tl.current = () => curIndex;
                  tl.toIndex = (index, vars) => toIndex(index, vars);
                  tl.times = times;
                  tl.progress(1, true).progress(0, true); // pre-render for performance
                  if (config.reversed) {
                    tl.vars.onReverseComplete();
                    tl.reverse();
                  }
                  return tl;
                }










                

            })
    }

})();
