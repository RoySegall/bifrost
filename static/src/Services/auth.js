/***
 * Check if the user is logged in.
 */
function isLoggedIn() {
    return window.localStorage.getItem('token');
}

export default isLoggedIn
