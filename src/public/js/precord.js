
var count = 7;
var countdownElement = document.getElementById("cuentaRegresivaRedireccion");

var countdownInterval = setInterval(function () {
    count--;
    countdownElement.textContent = count;

    if (count <= 2) {
        clearInterval(countdownInterval);
    }
}, 1000);
function saveUrlAsCookie() {
    var currentUrl = window.location.href; // Get the current URL

    // Delete previously saved cookie (if any)
    document.cookie = "deliveryConstructorCookie=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

    // Set the new cookie with the current URL
    document.cookie = "deliveryConstructorCookie=" + currentUrl;
}
saveUrlAsCookie()
