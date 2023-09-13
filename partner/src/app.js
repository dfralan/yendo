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

function toggleClientZone(){
    const clientZone = document.getElementById('clientZone');
    if (clientZone.classList.contains("display-none")){
      clientZone.classList.remove("display-none");
    } else {
      clientZone.classList.add("display-none");
    }
}

function attemptAccessPass() {
  
}
