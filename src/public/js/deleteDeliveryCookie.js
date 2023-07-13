function deleteCookie(cookieName) {
    document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}

// Uso de la función para eliminar una cookie específica
deleteCookie("deliveryConstructorCookie");