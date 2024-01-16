import { setupMenuIconBar } from "./menu-icon-bar.js";
import { initLoginPage, showLoginPage, hideLoginPage } from "./initLoginPage.js";


init();


function init() {

    //initialize login page
    initLoginPage();

    //let the document's body fade in
    document.querySelector('body').style.opacity = '1';

    //on login state change
    window.addEventListener('loginchange', async e => {
        setupMenuIconBar();                     //initialize sidebar
        if (e.detail.loginState.loggedIn) {
            initApp();                          //initialize application
            hideLoginPage();                    //hide login page
        } else {
            showLoginPage();                    //show user login
        }
    });
    
}


//initialize kanban board
function initApp() {
    return;
}
