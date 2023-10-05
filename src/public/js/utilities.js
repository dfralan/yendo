function clickOnTeller(){
    const buttonFatherBrick = document.getElementById('buttonFatherBrick');
    if (buttonFatherBrick){
      buttonFatherBrick.click();
    }
}

function toggleAccessPassModal(){
    const accessPassModal = document.getElementById('accessPassModal');
    if (accessPassModal.classList.contains("display-none")){
      accessPassModal.classList.remove("display-none");
    } else {
      accessPassModal.classList.add("display-none");
    }
}

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
