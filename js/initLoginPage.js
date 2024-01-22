/* setup event listener on backdrop click */
export function initLoginPage() {
    const login = document.getElementById("login-container");
    login.addEventListener('click', clickedOutside);
}


/* let the login page fade in */
export function showLoginPage() {
    const login = document.getElementById("login-container");
    login.style.display = "flex";
    setTimeout(() => login.style.opacity = "1");
}


/* let the login page fade out */
export function hideLoginPage() {
    const login = document.getElementById("login-container");
    login.style.opacity = "0";
    setTimeout(() => login.style.display = "none", 400);
}


/** event listener - clicked on backdrop */
function clickedOutside(e) {
    if (e.target.id && e.target.id == 'login-container' && window.wsLogin.state && window.wsLogin.state.loggedIn) {
        hideLoginPage();
    }
}