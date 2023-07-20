(function () {

function getLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
      console.log("La geolocalización no es soportada por este navegador.");
    }
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    // Guardar las coordenadas en el Local Storage
    localStorage.setItem('latitude', latitude);
    localStorage.setItem('longitude', longitude);

    console.log(`Latitud: ${latitude}\nLongitud: ${longitude}`);
    
      // Llamar a la función para obtener el nombre de la calle
      getAddressFromCoordinates(latitude, longitude);
  }

  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        console.log("El usuario denegó el permiso para la geolocalización.");
        break;
      case error.POSITION_UNAVAILABLE:
        console.log("La información de ubicación no está disponible.");
        break;
      case error.TIMEOUT:
        console.log("Se ha excedido el tiempo de espera para obtener la ubicación.");
        break;
      case error.UNKNOWN_ERROR:
        console.log("Se ha producido un error desconocido al obtener la ubicación.");
        break;
    }
  }

  function getAddressFromCoordinates(latitude, longitude) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
      .then(response => response.json())
      .then(data => {
        const address = data.display_name;
        const resultElement = document.getElementById("result");
        resultElement.textContent = `Ubicación: ${address}`;
      })
      .catch(error => {
        console.error('Error al obtener la dirección:', error);
      });
  }




// Run main when DOM is ready
document.addEventListener("DOMContentLoaded", function () {
    getLocation()
});

})();