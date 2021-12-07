export const storeToken = t => {
    localStorage.setItem('token', t)
}

export const getToken = () => {
    return localStorage.getItem('token');
}
