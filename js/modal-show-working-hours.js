import localize from "./localize.js";
import { openModal, closeModal } from "./modal.js";


const dateInput = {
    value: "",
};


/** show working hours */
function showWorkingHoursModal() {
    renderWorkingHoursModal('workingHours');
    openModal();
    document.getElementById("modal-close").focus();
}


/** render working hours modal */
async function renderWorkingHoursModal(topic) {
    const login = document.getElementById("ws-login");
    //await login.submitRequest('public/api/workinghours', {})
        //.then(result => {
        //    if (result.ok) {
        //    
        //    } else {
        //
        //    }  
        //});
    const modal = document.getElementById("modal-container");
    modal.innerHTML = modalTemplate(topic, { workingHours: [{from: "8:30", to: "17:33"}, {from: "20.12", to: "21.46"},] });
    addModalListeners(topic);
}


/** get a date as a formatted string*/
function getCurrentDate(d = new Date()) {
    return (
        `${d.getFullYear()}-${("0"+(d.getMonth()+1)).slice(-2)}-${("0"+d.getDate()).slice(-2)}T${("0"+d.getHours()).slice(-2)}:${("0"+d.getMinutes()).slice(-2)}`
    );
}


/** add event listeners for closing modal dialog */
 function addModalListeners(topic) {
    const modalClose = document.getElementById('modal-close');
    const modalContainer = document.getElementById('modal-container');
    const modalDateInput = document.getElementById('modal-working-hours-at');
    modalClose.addEventListener('click', closeWorkingHoursModal);
    modalContainer.addEventListener('click', clickedOutside);
    modalDateInput.addEventListener('change', dateInputChanged.bind(null, topic));
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
function dateInputChanged(topic, e) {
    dateInput.value = e.target.value;
    console.log("val: ", dateInput.value, " valNum: ", e.target.valueAsNumber, " valDate: ", e.target.valueAsDate);
    removeModalListeners();
    renderWorkingHoursModal(topic);
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
function modalTemplate(topic, data) {
    let dataList = '';
    data[topic].forEach((d, i) => dataList += modalDataItemTemplate(i, d));
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
