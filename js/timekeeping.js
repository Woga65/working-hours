import { setupModal } from "./modal.js";
import { setupMenuIconBar } from "./menu-icon-bar.js";
import { initLoginPage, showLoginPage, hideLoginPage } from "./initLoginPage.js";
import { submitRequest } from "../components/ws-login/ws-login.js";


init();


function init() {

    //initialize login page
    initLoginPage();

    //let the document's body fade in
    document.querySelector('body').style.opacity = '1';

    //on login state change
    window.addEventListener('loginchange', async e => {
        setupModal();                           //initialize modal
        setupMenuIconBar();                     //initialize sidebar
        if (e.detail.loginState.loggedIn) {
            initApp();                          //initialize application
            hideLoginPage();                    //hide login page
        } else {
            removeButtonListeners();            //clear button listeners
            showLoginPage();                    //show user login
        }
    });
    
}


/* initialize timekeeping App */
function initApp() {
    initWorkingHoursBackend();
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    startButton.addEventListener('click', startButtonListener);
    stopButton.addEventListener('click', stopButtonListener);
}


/* event listener on start button click */
async function startButtonListener(e) {
    await submitRequest('public/api/startworking', {})
        .then(result => {
            console.log(result);
        });
    this.setAttribute("disabled", "");
    document.getElementById('stop-button').removeAttribute('disabled');
}


/* event listener on stop button click */
async function stopButtonListener(e) {
    await submitRequest('public/api/endworking', {})
        .then(result => {
            console.log(result);
        });
    this.setAttribute("disabled", "");
    document.getElementById('start-button').removeAttribute('disabled');
}


/* create working_hours table if not exists */
async function initWorkingHoursBackend() {
    await submitRequest('public/api/initworkinghours', {})
        .then(result => {
            console.log(result);
        });
}


/* remove start and stop button listeners */
function removeButtonListeners() {
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    startButton.removeEventListener('click', startButtonListener);
    stopButton.removeEventListener('click', stopButtonListener);
}
