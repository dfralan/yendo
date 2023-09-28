

function saveUrl() {
    // Delete previously saved cookie (if any)
    localStorage.removeItem('currentUrl');

    // Set the current URL
    const currentUrl = window.location.href;

    // Redirects to partner menu area if it fits
    if (currentUrl.includes("partner")) {
        window.location.href = "https://yendo.delivery/partner/menu.html";
        return
    }
    
    // Save it to Local Storage
    localStorage.setItem('currentUrl', currentUrl);
}
saveUrl()
