/** setup data modal element*/
function setupModal() {
    if (!document.getElementById("modal-container")) {
        const parent = document.getElementById("timekeeping-container");
        const modal = document.createElement("div");
        modal.classList.add("modal-container");
        modal.id = "modal-container";
        parent.appendChild(modal);
    }
}


/** open modal dialog */
function openModal() {
    const modal = document.getElementById('modal-container');
    modal.style.display = "flex";   
    setTimeout(() => modal.style.opacity = "1", 0);
}


/** close modal dialog */
function closeModal(e) {
    const modal = document.getElementById('modal-container');
    modal.style.opacity = "";
    setTimeout(() => modal.style.display = "", 400);
}

export { setupModal, openModal, closeModal };