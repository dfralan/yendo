function clickOnTeller(){
    const buttonFatherBrick = document.getElementById('buttonFatherBrick');
    if (buttonFatherBrick){
      buttonFatherBrick.click();
    }
}

function toggleDisplay(selector) {
  const elements = document.querySelectorAll(selector);

  if (elements.length === 0) {
    console.error(`No elements found for selector: ${selector}`);
    return;
  }

  elements.forEach(element => {
    if (element.classList.contains("display-none")) {
      element.classList.remove("display-none");
    } else {
      element.classList.add("display-none");
    }
  });
}

console.log('we')

function toggleBurguer(){
  const burguerMenu = document.getElementById('burguerMenu');
  const burguerIcon = document.getElementById('burguerIcon');
  const closeIcon = document.getElementById('closeIcon');
    if (burguerMenu.classList.contains("display-none")){
      burguerMenu.classList.remove("display-none");
      closeIcon.classList.remove("display-none");
      burguerIcon.classList.add("display-none");
    } else {
      burguerMenu.classList.add("display-none");
      burguerIcon.classList.remove("display-none");
      closeIcon.classList.add("display-none");
    }
}
