function operatorState(h) {
  //Zero Zone
  var localDate = new Date();
  var zeroDate = localDate.toUTCString();
  zeroTime = ((zeroDate.split(" "))[4]).split(":");
  zeroInSec = (zeroTime[0] * 3600) + (zeroTime[1] * 60);
  a = h.slice(0, 5); a1 = a.split(":"); a2 = (a1[0] * 3600) + (a1[1] * 60); //openhour
  b = h.slice(6, 11); b1 = b.split(":"); b2 = (b1[0] * 3600) + (b1[1] * 60); //endhour
  pol = h.slice(12, 13)//operator (+ or -)
  c = h.slice(13, 18); c1 = c.split(":"); c2 = (c1[0] * 3600) + (c1[1] * 60);//gmt zone
  oh = 0;
  eh = 0;
  getOhEh()
  function getOhEh() {
      if (pol == "+") { oh = a2 - c2; eh = b2 - c2 }
      else { oh = a2 + c2; eh = b2 + c2 }
  }

  if ((oh < eh && zeroInSec >= oh && zeroInSec < eh) || (oh > eh && zeroInSec < eh && zeroInSec < oh) || (oh == eh)) {
      return true;
  }
  else {
      return false;
  }
}

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
        if (checkDeliveryState) {
          deliveryState = "Activo"
        } else {
          deliveryState = "Inactivo"
        }

        deliveryResults.innerHTML += `
        <a class="text-decoration-none" href="u/`+ obj.phoneNumber +`.html">
        <label role="button" class="list-group-item rounded-3 py-3">
          <div class="d-flex align-items-start">
            <div class="me-3">
              <img style="object-fit: cover;" class="rounded-2" src="`+ obj.profileImg +`" alt="" width="120px" height="120px">
            </div>
            <div class="align-items-bottom">
              <h5 class="m-0 fw-bold p-0">
                `+ deliveryUsername +`
              </h5>
              <p class="m-0 fw-semibold text-success">
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
              <small class="fw-bold bi bi-geo-alt">`+ obtenerContenidoParentesis(formCity.value)[0] + " (" + obtenerContenidoParentesis(formCity.value)[1] + ")" +`</small>
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
