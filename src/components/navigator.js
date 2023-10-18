let coverImg = 'https://images.pexels.com/photos/64609/pexels-photo-64609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

var navigatorview = `
<!-- Find delivery section -->
<div class="width-100 display-flex flex-col flex-end relative">

<img src=${coverImg} class=" width-100 height-100 cover cover-bottom absolute to-bottom">
<div  class="bg-black o-4 width-100 height-100 cover cover-bottom absolute to-bottom"></div>

    <div style="transition: .3s;" class="width-100 display-flex flex-col z-2 rounded-l padded s-gap to-center">
        
        <div class="responsive-width-50 display-flex flex-col padded m-gap no-padded-left no-padded-right">
            <br><br>    
            <h1 class="font-600 color-white">
                Encontrá lo que buscas
            </h1>
        </div>

        <div class="responsive-width-50 display-flex flex-row to-center s-gap">
            <input style="border-width: 1px ;" class="width-100 rounded-s border-solid decoration-none padded-wide border-secondary font-l" type="text" id="formCity" placeholder="Ingresá tu ciudad"
            pattern="^.*\(.+\).*" required loom-placeholder="Ingresá tu ciudad" loom>
            <button style="border-width: 1px ;border-color: #0D7A5F; background-color: #0D7A5F;" class="width-fit no-wrap font-500 decoration-none padded-wide color-white rounded-s font-l border-solid" type="button" id="buttonFindCityForm" role="button"
            loom="Empezar"></button>
        </div>

        <div class="responsive-width-50 compacted display-flex flex-wrap s-gap padded no-padded-top no-padded-left no-padded-right to-center">
            <div class="no-wrap overflow-hidden font-500 decoration-none color-white xs-padded display-flex flex-wrap to-center xs-gap">
                <h4 id="categoryPillsContainer" class='overflow-scroll'>
                    <span class='o-8'>Tendencias:</span>    
                    ${constructCategoriesDA(categories)}
                </h4>
                <button onclick="toggleCategories()" id='categoriesToggler' class='font-400 cursor-pointer fill-white display-flex full-center border-none bg-lighter'>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z"/></svg>
                </button>
            </div>
        </div>

    </div>

</div>
`

function constructCategoriesDA(categories) {
    var categoriesN = 0

    var categoriesConstruction = '';
    
    categories.categorias.forEach(category => {

        categoriesN ++
    
            if (category.codigo === "000") {return}
            const categoryHTML = `
            <span data-code='${category.codigo}' class="popularCategoryItem cursor-pointer no-wrap font-500 decoration-none color-white">
                ${category.nombre}, 
            </span>
            `;
            const HidedCategoryHTML = `
            <span data-code='${category.codigo}' class="categoryItem cursor-pointer display-none no-wrap font-500 decoration-none color-white rounded-s border-solid xs-padded">
                ${category.nombre}, 
            </span>
            `;
    
            if (categoriesN > 6) {
            categoriesConstruction += HidedCategoryHTML;
            } else {
            categoriesConstruction += categoryHTML;
            }
            
        });

    return categoriesConstruction;
    
}


function toggleCategories() {
    const container = document.getElementById('categoryPillsContainer');
	const categoryItems = document.querySelectorAll('.categoryItem');

	if (container.classList.contains("wrap")) {

		categoryItems.forEach(items => {
			items.classList.remove("display-none");
		});
		container.classList.remove("wrap");

	} else {
		categoryItems.forEach(items => {
		    items.classList.add("display-none");
		});
		container.classList.add("wrap");

	}
}
