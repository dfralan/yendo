

function saveUrl() {
    // Delete previously saved cookie (if any)
    localStorage.removeItem('currentUrl');
    // Set the current URL
    const currentUrl = window.location.href;
    // Save it to Local Storage
    localStorage.setItem('currentUrl', currentUrl);
}
saveUrl()
