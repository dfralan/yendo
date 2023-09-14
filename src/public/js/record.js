

function saveUrl() {
    var currentUrl = window.location.href; // Get the current URL
    // Delete previously saved cookie (if any)
    localStorage.removeItem('currentUrl');
    // Save the current URL to Local Storage
    localStorage.setItem('currentUrl', currentUrl);
    
}
saveUrl()
