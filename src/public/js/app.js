/*!
 * App for loom web.
 * Copyright 2022-2023 The Teller Authors
 * Licensed under the Apache License, Version 2.0
 */

(() => {
  'use strict'

  function main() {

    // Collapse navbar button animation
    const plusIcon = document.getElementById('navbar-toggler-icon');

    if (plusIcon) {
      document.getElementById('navbarNavAltMarkup').addEventListener('show.bs.collapse', function () {
        plusIcon.classList.add('rotate');
      });
      document.getElementById('navbarNavAltMarkup').addEventListener('hide.bs.collapse', function () {
        plusIcon.classList.remove('rotate');
      });
    }

    // Loading DOM animation
    const logoLoadAnimationContainer = document.querySelector('.logoLoadAnimationContainer');
    const logoLoadAnimation = document.querySelector('.logoLoadAnimation');

    if (logoLoadAnimation) {
      function fadeOut(el) {
        var opacity = 1; // Initial opacity
        var interval = setInterval(function () {
          if (opacity > 0) {
            opacity -= 0.1;
            el.style.opacity = opacity;
          } else {
            clearInterval(interval); // Stop the interval when opacity reaches 0
            el.style.display = 'none'; // Hide the element
          }
        }, 50);
      }
      setTimeout(function () {
        fadeOut(logoLoadAnimation);
        setTimeout(function () {
          fadeOut(logoLoadAnimationContainer);
        }, 500);
      }, 1000);
    }

    // Popover launch
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    // Tooltip launch
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    // Need help listener to launch teller
    const navBarTellerLaunch = document.getElementById("navBarTellerLaunch")
    if (navBarTellerLaunch){
      navBarTellerLaunch.addEventListener('click', function() {
        const buttonFatherBrick = document.getElementById('buttonFatherBrick');
        if (buttonFatherBrick){
          buttonFatherBrick.click();
        }
        
      })
    }

    addToHomescreen({
      skipFirstVisit: false,
      maxDisplayCount: 1,
      startDelay: 0,
      lifespan: 15,
      displayPace: 1440,
      icon: 'https://yendo.delivery/src/img/yendo-600x600.png',
      message: '¡Agrega esta aplicación a tu pantalla de inicio!',
      validLocation: ['home', 'web'],
      onAdd: function () {
        // Se ejecuta cuando se agrega a la pantalla de inicio
      },
      onPrivate: function () {
        // Se ejecuta cuando el acceso directo se abre en modo de navegación privada
      }
    });

    let downloadAppButton = document.getElementById("downloadTheDirectAccess")

    downloadAppButton.addEventListener("click", function () {
      console.log("wep")
      addToHomescreen();
  })
    
  }
  window.addEventListener('DOMContentLoaded', () => {
    main()
  })

})()



