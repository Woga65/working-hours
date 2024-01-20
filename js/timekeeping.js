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
    getWorkingState().then(result => setInitialButtonState(result));
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    startButton.addEventListener('click', startButtonListener);
    stopButton.addEventListener('click', stopButtonListener);
}


/* event listener on start button click */
async function startButtonListener(e) {
    const result = await submitRequest('public/api/startworking', {});
    console.log(await result);
    setButtonsWorkStarted();
}


/* event listener on stop button click */
async function stopButtonListener(e) {
    const result = await submitRequest('public/api/endworking', {});
    console.log(await result);
    setButtonsWorkNotStarted();
}


/* create working_hours table if not exists */
async function initWorkingHoursBackend() {
    const result = await submitRequest('public/api/initworkinghours', {});
    console.log(await result);
}


/* determine whether a working session is started */
async function getWorkingState() {
    const result = await submitRequest('public/api/workingstate', {});
    console.log("Work started: ", await result);
    return await result;
}


/* remove start and stop button listeners */
function removeButtonListeners() {
    const startButton = document.getElementById('start-button');
    const stopButton = document.getElementById('stop-button');
    startButton.removeEventListener('click', startButtonListener);
    stopButton.removeEventListener('click', stopButtonListener);
}


/* restore the button's state according to the working 
 * session's state after a probably occured page reload */
function setInitialButtonState(result) {
    if (!result.ok || !result.data) return;
    result.data.workingStarted
        ? setButtonsWorkStarted()
        : setButtonsWorkNotStarted();
}


/* disable start and logout button, enable stop button */
function setButtonsWorkStarted() {
    document.getElementById('stop-button').removeAttribute('disabled');
    document.getElementById('start-button').setAttribute('disabled', "");
    document.getElementById('ws-login').disableLogoutButton();
}


/* enable start and logout button, disable stop button */
function setButtonsWorkNotStarted() {
    document.getElementById('start-button').removeAttribute('disabled');
    document.getElementById('stop-button').setAttribute('disabled', "");
    document.getElementById('ws-login').enableLogoutButton();
}