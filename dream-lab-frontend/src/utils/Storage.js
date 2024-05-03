/* LOCAL STORAGE */

export function existsInLocalStorage(key) {
    return localStorage.getItem(key) !== null;
}

export function saveToLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

export function getFromLocalStorage(key) {
    return localStorage.getItem(key);
}

export function removeFromLocalStorage(key) {
    localStorage.removeItem(key);
}

export function multiClearLocalStorage(keys) {
    keys.forEach((key) => {
        removeFromLocalStorage(key);
    });
}

export function clearLocalStorage() {
    localStorage.clear();
}

/* SESSION STORAGE */

export function existsInSessionStorage(key) {
    return sessionStorage.getItem(key) !== null;
}

export function saveToSessionStorage(key, value) {
    sessionStorage.setItem(key, value);
}

export function getFromSessionStorage(key) {
    return sessionStorage.getItem(key);
}

export function removeFromSessionStorage(key) {
    sessionStorage.removeItem(key);
}

export function multiClearSessionStorage(keys) {
    keys.forEach((key) => {
        removeFromSessionStorage(key);
    });
}

export function clearSessionStorage() {
    sessionStorage.clear();
}

/* LOCAL STORAGE & SESSION STORAGE */

export function clearStorages() {
    localStorage.clear();
    sessionStorage.clear();
}
