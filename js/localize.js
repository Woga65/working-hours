import { helpItems_en, helpItems_de } from "./help-items.js";


export default function localize() {
    switch (window.wsLogin.languages[0].toLowerCase()) {
        case 'de':
        case 'de-de':
        case 'de-at':
        case 'de-ch':
        case 'de-li':
        case 'de-lu':
            return german();            
        case 'en':
        case 'en-us':
        case 'de-gb':
            return english();
    }
    return generic();
}


function german() {
    return {
        cancel: 'Abbrechen',
        add: 'Hinzufügen',
        close: 'Schließen',
        delete: 'Löschen',
        enterData: 'Daten eingeben...',
        iconBar: {
            userTitle: 'Benutzerprofil',
            workingHoursTitle: 'Arbeitszeit',
            workingHoursHeading: 'Arbeitszeit am',
            helpTitle: 'Hilfe',
            helpHeading: 'Hilfe',
            helpItems: helpItems_de(),
        },
    }
}


function english() {
    return {
        cancel: 'Cancel',
        add: 'Add',
        close: 'Close',
        delete: 'Delete',
        enterData: 'enter data...',
        iconBar: {
            userTitle: 'user \nprofile',
            workingHoursTitle: 'Working hours',
            workingHoursHeading: 'Working hours at',
            helpTitle: 'Help',
            helpHeading: 'Help',
            helpItems: helpItems_en(),
        },
    };
}


function generic() {
    return english();
}
