/***
 * Check if the user is logged in.
 */
function isLoggedIn() {
    return window.localStorage.getItem('token');
}

export const Logout = () => {
    localStorage.removeItem('token');
};

export default isLoggedIn
