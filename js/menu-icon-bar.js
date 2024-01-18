import { setupModal } from "./modal.js";
import { showHelpModal } from "./modal-show-help.js";
import { showWorkingHoursModal } from "./modal-show-working-hours.js";
import { showLoginPage } from "./initLoginPage.js";
import localize from "./localize.js";


const setupIconFunctions = [
    setupShowWorkingHoursIcon,
    setupUserProfileIcon,
    setupHelpIcon,
]


/** setup the menu icon bar */
function setupMenuIconBar() {
    if (!document.querySelector(".menu-icon-bar")) {
        setupModal();
        const parent = document.getElementById("timekeeping-container");
        const menuCol = document.createElement("div");
        menuCol.classList.add("menu-icon-bar");
        setupIconFunctions.forEach(iconFunc => iconFunc(menuCol));
        parent.appendChild(menuCol);
    }
}


/** setup the remove list icon */
function setupShowWorkingHoursIcon(parent) {
    const list = menuIconTemplate('show-working-hours', localize().iconBar.workingHoursTitle, `<img src="./img/icons8-show-properies-26.png">`, 'var(--primary-color)');
    parent.appendChild(list);
    list.addEventListener("click", () => showWorkingHoursModal());
}



/** setup the settings icon */
function setupUserProfileIcon(parent) {
    const userProfile = menuIconTemplate('user-profile', localize().iconBar.userTitle, '&#xed01;', 'var(--primary-color)');
    parent.appendChild(userProfile);
    userProfile.addEventListener("click", showLoginPage);
}


/** setup the help icon */
function setupHelpIcon(parent) {
    const help = menuIconTemplate('help-icon', localize().iconBar.helpTitle, '&#xefca;', 'var(--primary-color)');
    parent.appendChild(help);
    help.addEventListener("click", showHelpModal);
}


function menuIconTemplate(id, desc, html, color, display = '') {
    const icon = document.createElement("div");
    icon.id = id;
    icon.setAttribute('title', desc);
    icon.innerHTML = html;
    icon.style.color = color;
    icon.style.display = display;
    return icon;
}


export { setupMenuIconBar };
