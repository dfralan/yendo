let formCity = document.getElementById("formCity")
let buttonFindCityForm = document.getElementById("buttonFindCityForm")

// JavaScript to handle form submission and display control messages
buttonFindCityForm.addEventListener('click', function (event) {
  let formCityID = (obtenerIdCiudad(obtenerContenidoParentesis(formCity.value)[1], obtenerContenidoParentesis(formCity.value)[0]) || "");
  let matchFound = false; // Variable to track if a match is found
  let deliveryResults = document.getElementById("deliveryResults")
  deliveryResults.innerHTML = ""

  for (const key in usersAR) {
    if (usersAR.hasOwnProperty(key)) {
      const obj = usersAR[key];
      if (obj.cityID === formCityID) {

        let deliveryUsername = obj.username
        let checkDeliveryState = (operatorState(obj.activeInterval))
        var deliveryState
        var deliveryStateStyle
        if (checkDeliveryState) {
          deliveryState = "Activo"
          deliveryStateStyle = " "
        } else {
          deliveryState = "Inactivo"
          deliveryStateStyle = " style = 'filter: grayscale(100%); opacity: 0.9' "
        }

        deliveryResults.innerHTML += `
        <a` + deliveryStateStyle + `class="text-decoration-none" href="https://yendo.delivery/`+ parseInt(key)/11 +`">
        <label role="button" class=" py-3">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <img style="object-fit: cover;" class="rounded-circle" src="`+ obj.profileImg +`" alt="" width="90px" height="90px">
            </div>
            <div class="align-items-bottom">
              <h5 class="m-0 p-0 text-dark">
                `+ deliveryUsername +`
              </h5>
              <p class="m-0 fw-semibold text-primary" loom="` + deliveryState + `">
                ` + deliveryState + `
              </p>
              <div>
                <rater rating="`+ obj.rank +`">
                  <ul class="list-inline mb-0 gap-0">
                    <li class="list-inline-item badge rounded-pill text-light bg-black"></li>
                    <li class="list-inline-item bi text-warning" style="margin: 0;"></li>
                    <li class="list-inline-item bi text-warning" style="margin: 0;"></li>
                    <li class="list-inline-item bi text-warning" style="margin: 0;"></li>
                    <li class="list-inline-item bi text-warning" style="margin: 0;"></li>
                    <li class="list-inline-item bi text-warning" style="margin: 0;"></li>
                  </ul>
                </rater>
              </div>
              <small class="bi bi-geo-alt text-dark">`+ obtenerContenidoParentesis(formCity.value)[0] + " (" + obtenerContenidoParentesis(formCity.value)[1] + ")" +`</small>
            </div>
          </div>
        </label>
        </a>
            `;
        matchFound = true; // Set the flag to true if a match is found
      }
    }
  }

  rateNow()

  if (!matchFound) {
    let imgCoverBuscarPage = document.getElementById("imgCoverBuscarPage")
  
    deliveryResults.innerHTML = `
    <div class="text-center display-flex flex-col full-center l-gap">
          <img width="220px" id="imgCoverBuscarPage" src='src/public/img/noDelivery.svg' class="cover" alt="">
          <p>No hay repartidores en tu zona.</p>
          <a class="text-decoration-none" href="register.html">¿Querés ser repartidor?</a>
    </div>
    `
    console.log("No deliverys found in that location."); // Log a message if no match is found
  }
});
