import localize from "./localize.js";
import { openModal, closeModal } from "./modal.js";
import { submitRequest } from "../components/ws-login/ws-login.js";

const dateInput = {
    value: getCurrentDate(),
};


/** show working hours */
function showWorkingHoursModal() {
    renderWorkingHoursModal()
        .then(_ => {
            openModal();
            document.getElementById("modal-close").focus();
        });
}


/** render working hours modal */
async function renderWorkingHoursModal() {
    const modal = document.getElementById("modal-container");
    await submitRequest('public/api/workinghours', { workingDay: dateInput.value.slice(0,10)})
        .then(result => {
            if (result.ok) {
                modal.innerHTML = modalTemplate(result.data);
            } else {
                console.log('err: ', result)
            }
            addModalListeners();  
        });
}


/** get a date as a formatted string*/
function getCurrentDate(d = new Date()) {
    return (
        `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0"+d.getDate()).slice(-2)}T${("0"+d.getHours()).slice(-2)}:${("0"+d.getMinutes()).slice(-2)}`
    );
}


/** add event listeners for closing modal dialog */
 function addModalListeners() {
    const modalClose = document.getElementById('modal-close');
    const modalContainer = document.getElementById('modal-container');
    const modalDateInput = document.getElementById('modal-working-hours-at');
    modalClose.addEventListener('click', closeWorkingHoursModal);
    modalContainer.addEventListener('click', clickedOutside);
    modalDateInput.addEventListener('change', dateInputChanged);
}


/** remove event listeners from dialog */
function removeModalListeners() {
    const modalClose = document.getElementById('modal-close');
    const modalContainer = document.getElementById('modal-container');
    const modalDateInput = document.getElementById('modal-working-hours-at');
    modalContainer.removeEventListener('click', clickedOutside);
    modalClose.removeEventListener('click', closeWorkingHoursModal);
    modalDateInput.removeEventListener('change', dateInputChanged);
}


/** event listener - date input has changed */
function dateInputChanged(e) {
    dateInput.value = e.target.value;
    removeModalListeners();
    renderWorkingHoursModal();
}


/** event listener - close modal data dialog */
function closeWorkingHoursModal(e) {
    closeModal();
    removeModalListeners();
}


/** event listener - clicked on backdrop */
function clickedOutside(e) {
    if (e.target.id && e.target.id == 'modal-container') {
        closeWorkingHoursModal(e);
    }
}


/** fill modal with data */
function modalTemplate(data) {
    let dataList = '';
    data.forEach((d, i) => {
        dataList += modalDataItemTemplate(i, { from: d.wh_start_time.slice(11,16), to: d.wh_end_time?.slice(11,16) || "xx:xx" });
    });
    return `
        <div id="modal" class="modal">
            <div class="modal-msg">
                <h2>${localize().iconBar.workingHoursHeading}</h2>
                <p>
                    <input id="modal-working-hours-at" 
                        type="datetime-local"
                        value="${dateInput.value ? dateInput.value : getCurrentDate()}"
                    >
                </p>
            </div>
            <div class="modal-data">
                <ul>
                    ${dataList}
                    <li>
                        <button id="modal-close">${localize().close}</button>
                    </li>
                </ul>
            </div>
        </div>`.trim();
}


/** modal list item template */
function modalDataItemTemplate(index, data) {
    return `
    <li id="modal-data-row-${index}">
        <div id="modal-data-item-${index}" class="working-hours-item">${data.from} - ${data.to}</div>
    </li>`.trim();
}


export { showWorkingHoursModal };
