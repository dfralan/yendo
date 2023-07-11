
// Crear un objeto que almacene las ciudades por provincia
var ciudadesPorProvincia = {};
dataAR.forEach(function (provincia) {
    var nombreProvincia = provincia.nombre;
    ciudadesPorProvincia[nombreProvincia] = provincia.ciudades.map(function (ciudad) {
        return ciudad.nombre + " (" + nombreProvincia + ")";
    });
});

// Configurar el input predictivo
$("#formCity").autocomplete({
    source: function (request, response) {
        var term = request.term.toLowerCase();
        var suggestions = [];

        // Buscar coincidencias en las ciudades y provincias
        Object.keys(ciudadesPorProvincia).forEach(function (provincia) {
            var ciudades = ciudadesPorProvincia[provincia];
            var filteredCiudades = ciudades.filter(function (ciudad) {
                return ciudad.toLowerCase().indexOf(term) !== -1;
            });

            if (filteredCiudades.length > 0) {
                suggestions.push({ provincia: provincia, ciudades: filteredCiudades });
            }
        });

        // Devolver las sugerencias encontradas
        response(suggestions);
    },
    select: function (event, ui) {
        // Autocompletar el valor seleccionado
        $(this).val(ui.item.ciudades[0]);
        return false;
    },
    focus: function (event, ui) {
        // Evitar que el valor seleccionado se muestre en negrita
        event.preventDefault();
    },
    minLength: 2 // Mínimo de caracteres para mostrar las sugerencias
}).data("ui-autocomplete")._renderItem = function (ul, item) {
    // Mostrar la sugerencia con el formato deseado
    var label = $("<div>").addClass("autocomplete-item").text(item.ciudades[0]);
    return $("<li class='dropdown-item'>").append(label).appendTo(ul);
};

// Add Bootstrap classes
$("ul.ui-autocomplete")
.addClass("dropdown-menu bg-body")
.addClass("border")
  .attr("id", "myList")
  .css({
    "max-height": "300px",
    "overflow-y": "auto",
  });
$("input.ui-autocomplete-input").addClass("form-control"); // Add form-control class to the input field


