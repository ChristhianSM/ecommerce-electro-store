// Funcion para guardar en el local Storage
export const setLocalStorage = (data) => {
    localStorage.setItem("ShoppingCart", JSON.stringify(data));
}

// Funcion para traer datos del local Storage
export const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}