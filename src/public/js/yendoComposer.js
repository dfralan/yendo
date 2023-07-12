(function () {
    function main() {

    const yendoTag = document.querySelector("yendo");

    if (yendoTag) {

        var switchDirec = document.getElementById('invertirDireccionesBtn');
        var pedirButton = document.getElementById('pedir');
        let username = yendoTag.getAttribute('username')
        let userKind = yendoTag.getAttribute('userKind')
        let phoneNumber = yendoTag.getAttribute('phoneNumber')
        // Get the input values
        var direccionRetiro = document.getElementById('direccionRetiro');
        var direccionEntrega = document.getElementById('direccionEntrega');
        var indicacionesEntrega = document.getElementById('indicacionesEntrega');
        var fragil = document.getElementById('btn-check-fragil');
        var urgente = document.getElementById('btn-check-urgente');
        var frio = document.getElementById('btn-check-frio');
        var efectivo = document.getElementById('btn-check-efectivo');
        var tags = [];
        // Check the patterns for the input fields
        var direccionPattern = /^[A-Za-z0-9\s.,'¡¿ñÑáéíóúÁÉÍÓÚüÜ]+$/;
        var activeInterval = yendoTag.getAttribute("activeInterval")
        var state = document.getElementById("repartidorEstado")

        if (operatorState(activeInterval)) {
            state.textContent = "Activo"
            state.classList.add("text-success");
        } else {
            state.textContent = "Inactivo"
            state.classList.add("text-danger");
        }

        
        // Set data of actual selected delivery
        let deliveryBoy = document.getElementById("selectedDeliveryUsername")
        let userKindSelected = document.getElementById("userKind")
        deliveryBoy.textContent = username
        if (userKind == "0"){
            userKindSelected.classList.add("bi-person-check-fill")
        } else {
            userKindSelected.classList.add("bi-building-fill-check")
        }

        switchDirec.addEventListener("click", function () {
            var tempValue = direccionRetiro.value;
            direccionRetiro.value = direccionEntrega.value;
            direccionEntrega.value = tempValue;
        })

        function pedir() {
            
            if (fragil.checked) {
                tags.push("#Frágil");
            }
            if (urgente.checked) {
                tags.push("#Urgente");
            }
            if (frio.checked) {
                tags.push("#Frío");
            }
            if (efectivo.checked) {
                tags.push("#PagoEnEfectivo");
            }
            var tagsString = tags.join(" ");

            var mensajeRepartidor = "¡Hola "+ username +"!\n\n" +
                            "Necesito realizar un envío con la siguiente ruta:\n\n" +
                            "Dirección de retiro: " + direccionRetiro.value + "\n" +
                            "Dirección de entrega: " + direccionEntrega.value + "\n\n" +
                            "Indicaciones:\n" +
                            indicacionesEntrega.value + "\n\n" +
                            tagsString + "\n\n" +
                            "Por favor, confirma la aceptación de este pedido lo antes posible.\n\n" +
                            "¡Gracias!\n\n" +
                            "Mensaje generado desde la App Yendo.";
            
            mensajeEncoded = encodeURIComponent(mensajeRepartidor)
            window.open('https://wa.me/' + phoneNumber + '?text=' + mensajeEncoded, "_blank")

            // Optional: Reset the form after submission
            document.getElementById('direccionRetiro').value = "";
            document.getElementById('direccionEntrega').value = "";
            document.getElementById('indicacionesEntrega').value = "";
            document.getElementById('btn-check-fragil').checked = false;
            document.getElementById('btn-check-urgente').checked = false;
            document.getElementById('btn-check-frio').checked = false;
            document.getElementById('btn-check-efectivo').checked = false;
        }

        function hanginAround(){
            if ((direccionPattern.test(direccionRetiro.value)) && (direccionPattern.test(direccionEntrega.value))){
                pedirButton.removeAttribute('disabled');
                pedirButton.addEventListener("click", function () {
                    pedir()
                })
            }
            else {
                pedirButton.setAttribute('disabled', 'disabled');
            }
        }

        // Input on retiro
        direccionRetiro.addEventListener("input", function () {
            if (direccionPattern.test(direccionRetiro.value)) {//no valid retiro address
                direccionRetiro.classList.add("is-valid");
                direccionRetiro.classList.remove("is-invalid");
                hanginAround()
            } else {
                direccionRetiro.classList.add("is-invalid");
                direccionRetiro.classList.remove("is-valid");
                pedirButton.setAttribute('disabled', 'disabled');
            }
        });

        // Input on entrega
        direccionEntrega.addEventListener("input", function () {
            if (direccionPattern.test(direccionEntrega.value)) {//no valid retiro address
                direccionEntrega.classList.add("is-valid");
                direccionEntrega.classList.remove("is-invalid");
                hanginAround()
            } else {
                direccionEntrega.classList.add("is-invalid");
                direccionEntrega.classList.remove("is-valid");
                pedirButton.setAttribute('disabled', 'disabled');
            }
        });

    }
    }

    // Run main when DOM is ready
    document.addEventListener("DOMContentLoaded", function () {
        main()
    });

})();