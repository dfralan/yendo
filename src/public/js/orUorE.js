const ar = {
  60427792846014: {
    cityID: "1989",
    username: "@kevindevetac",
    userKind: "0",
    phoneNumber: "5493435713274",
    activeInterval: "08:00/18:00(-03:00)",
    rank: "4.5",
    profileImg: "https://scontent.fros2-2.fna.fbcdn.net/v/t1.6435-9/62256802_2404539729608958_3768627338867113984_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=6RqwvCOn8PgAX9Hj6n0&_nc_ht=scontent.fros2-2.fna&oh=00_AfCptYoRA9zK1OinfA2vhnQmPq_M7j-7ZYvpm0o36St-_w&oe=64D38CAA"
  },
  60427792846012: {
    cityID: "1989",
    username: "@francossia",
    userKind: "0",
    phoneNumber: "5493435713270",
    activeInterval: "08:00/18:00(-03:00)",
    rank: "3.0",
    profileImg: "https://scontent.fros2-2.fna.fbcdn.net/v/t39.30808-6/344255982_1309057513288690_2623422176070735081_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=T4OsKmVEjogAX_aXi0_&_nc_ht=scontent.fros2-2.fna&oh=00_AfAIv2A7jwsXWnludwQVQhu1MKut-bXlD58eOg7i3Gzk9g&oe=64B33E95"
  },
  60427792846011: {
    cityID: "1989",
    username: "@facudevetac",
    userKind: "0",
    phoneNumber: "5493435713271",
    activeInterval: "08:00/18:00(-03:00)",
    rank: "4.5",
    profileImg: "https://scontent.fros2-2.fna.fbcdn.net/v/t39.30808-6/344210808_236113162432935_2413550585574849855_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=-P6bDYItXDMAX81ESMl&_nc_ht=scontent.fros2-2.fna&oh=00_AfCdSbwuxNWNDpNzithZenNtr4TqQXeZ9rGHT6fsQ0c-tA&oe=64B2CBB0"
  },
};

let formCity = document.getElementById("formCity")
let buttonFindCityForm = document.getElementById("buttonFindCityForm")

// JavaScript to handle form submission and display control messages
buttonFindCityForm.addEventListener('click', function (event) {
  let formCityID = (obtenerIdCiudad(obtenerContenidoParentesis(formCity.value)[1], obtenerContenidoParentesis(formCity.value)[0]) || "");
  let matchFound = false; // Variable to track if a match is found
  let deliveryResults = document.getElementById("deliveryResults")
  deliveryResults.innerHTML = ""

  for (const key in ar) {
    if (ar.hasOwnProperty(key)) {
      const obj = ar[key];
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
        <a` + deliveryStateStyle + `class="text-decoration-none" href="u/`+ obj.phoneNumber +`.html">
        <label role="button" class=" py-3">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <img style="object-fit: cover;" class="rounded-circle" src="`+ obj.profileImg +`" alt="" width="90px" height="90px">
            </div>
            <div class="align-items-bottom">
              <h5 class="m-0 p-0 text-dark">
                `+ deliveryUsername +`
              </h5>
              <p class="m-0 fw-semibold text-primary">
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
    deliveryResults.innerHTML = `
    <div class="text-center">
          <img class="d-block mx-auto mb-4" src="src/public/img/noDelivery.svg" alt="" width="160">
          <p>No hay repartidores en tu zona.</p>
          <a class="text-decoration-none" href="register.html">¿Querés ser repartidor?</a>
        </div>
    `
    console.log("No deliverys found in that location."); // Log a message if no match is found
  }
});
