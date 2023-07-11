(() => {
    'use strict'
  
    // Set qr code
    function main() {
        let qrdinamic = document.getElementsByTagName("qrs")
        if (qrdinamic) {
        let qrda = Array.from(qrdinamic);
        qrda.forEach((element) => {
            let width = element.getAttribute("width") || "220px";
            let height = element.getAttribute("height") || (width || "220px");
            let colorDark = element.getAttribute("colorDark") || "#000000";
            let colorLight = element.getAttribute("colorLight") || "#ffffff";
            let content = element.getAttribute("content") || null;
    
            if (content) {
                var qrcode = new QRCode(element, {
                    text: "https://yendo.vercel.app/u/549" + content,
                    width: parseInt(width),
                    height: parseInt(height),
                    colorDark : colorDark,
                    colorLight : colorLight,
                    correctLevel : QRCode.CorrectLevel.H
                });
            }
            
          });
        }
}
window.addEventListener('DOMContentLoaded', () => {
  main()
})

})()
