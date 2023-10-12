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

    // Popover launch
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
    const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
    // Tooltip launch
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

    const imgElement = document.getElementById('imgCoverBuscarPage');
    const newImg = new Image();

    // Set the source for the new image
    newImg.src = 'https://images.pexels.com/photos/64609/pexels-photo-64609.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';

    // Once the new image is loaded, replace the placeholder image
    newImg.onload = function() {
      imgElement.src = newImg.src;
    };
    
  }
  window.addEventListener('DOMContentLoaded', () => {
    main()
  })

})()



