let coverImg = 'https://images.pexels.com/photos/64609/pexels-photo-64609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

var navigatorview = `
<!-- Find delivery section -->
<div style='min-height: 600px' class="width-100 display-flex flex-col full-center relative">

    <img src=${coverImg} class="width-100 height-100 cover cover-bottom absolute to-bottom">
    <div  class="bg-black o-4 width-100 height-100 cover cover-bottom absolute to-bottom"></div>

    <div class='padded no-padded-left no-padded-right display-flex full-center width-100'>
        

        <div style="transition: .3s;" class="responsive-width-50 display-flex flex-col z-2 rounded-l x-padded s-gap to-center bg-white">
            
            <h1 class="font-600 color-primary width-100 padded no-padded-left no-padded-right">
                Encontrá lo que buscas
            </h1>

            <div class="width-100 display-flex flex-row to-center s-gap">
                <input style="border-width: 1px ;" class="width-100 rounded-s border-solid decoration-none padded-wide border-secondary font-l" type="text" id="formCity" placeholder="Ingresá tu ciudad"
                pattern="^.*\(.+\).*" required loom-placeholder="Ingresá tu ciudad" loom>
                <button style="border-width: 1px ;border-color: #0D7A5F; background-color: #0D7A5F;" class="width-fit no-wrap font-500 decoration-none padded-wide color-white rounded-s font-l border-solid" type="button" id="buttonFindCityForm" role="button"
                loom="Empezar"></button>
            </div>

            <div id="categoryPillsContainer" class='compacted display-flex flex-wrap s-gap width-100 padded no-padded-left no-padded-right no-padded-top'>  
                ${constructCategoriesDA(categories)}
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
            <h4 style='border-width: 1.5px; ; border-color: #0D7A5F; color: #0D7A5F' data-code='${category.codigo}' class="cursor-pointer no-wrap font-500 decoration-none rounded-s border-solid xs-padded popularCategoryItem">
                ${category.nombre}
            </h4>
            `;
            const HidedCategoryHTML = `
            <h4 style='border-width: 1.5px; border-color: #0D7A5F; color: #0D7A5F' data-code='${category.codigo}' class="cursor-pointer no-wrap font-500 decoration-none rounded-s border-solid xs-padded categoryItem display-none">
                ${category.nombre}
            </h4>
            `;
    
            if (categoriesN > 6) {
            categoriesConstruction += HidedCategoryHTML;
            } else {
            categoriesConstruction += categoryHTML;
            }
            
        });
        let toggler = `
        <h4 onclick="toggleCategories()" id='categoriesToggler' class='color-black font-500 cursor-pointer display-flex full-center border-none bg-none'>
            Ver más
        </h4>
        `
        categoriesConstruction += toggler;

    return categoriesConstruction;
    
}


function toggleCategories() {
    const container = document.getElementById('categoryPillsContainer');
    const categoriesToggler = document.getElementById('categoriesToggler');
	const categoryItems = document.querySelectorAll('.categoryItem');

	if (container.classList.contains("compacted")) {

		categoryItems.forEach(items => {
			items.classList.remove("display-none");
		});
        container.classList.remove("compacted");
        categoriesToggler.innerText = 'Ver menos'

	} else {
		categoryItems.forEach(items => {
		    items.classList.add("display-none");
		});
        container.classList.add("compacted");
        categoriesToggler.innerText = 'Ver más'

	}
}
