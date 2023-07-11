/*!
 * App for loom web.
 * Copyright 2022-2023 The Teller Authors
 * Licensed under the Apache License, Version 2.0
 */

(() => {
  'use strict'

  function main() {
    // Loading DOM animation
    const logoLoadAnimationContainer = document.querySelector('.logoLoadAnimationContainer');
    const logoLoadAnimation = document.querySelector('.logoLoadAnimation');
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
  }
  window.addEventListener('DOMContentLoaded', () => {
    main()
  })

})()



