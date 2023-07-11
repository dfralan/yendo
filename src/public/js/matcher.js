function obtenerContenidoParentesis(str) {
    var regex = /(.*) \((.*)\)/;
    var resultado = regex.exec(str);
    
    if (resultado) {
      var a = resultado[1];
      var b = resultado[2];
      return [a, b];
    } else {
      return null; // El formato del string no coincide con lo esperado
    }
  }
  
  function obtenerIdCiudad(provincia, ciudad) {
      
    // Buscar la provincia en los datos
    var provinciaEncontrada = dataAR.find(function(prov) {
      return prov.nombre.toLowerCase() === provincia.toLowerCase();
    });
  
    if (provinciaEncontrada) {
      // Buscar la ciudad dentro de la provincia encontrada
      var ciudadEncontrada = provinciaEncontrada.ciudades.find(function(ciud) {
        return ciud.nombre.toLowerCase() === ciudad.toLowerCase();
      });
  
      if (ciudadEncontrada) {
        return ciudadEncontrada.id;
      } else {
        return "Ciudad no encontrada";
      }
    } else {
      return "Provincia no encontrada";
    }
  }