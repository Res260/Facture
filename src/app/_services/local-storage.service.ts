import {Injectable} from '@angular/core';
import {Settings} from '../_models/_settings/settings';

/**
 * Service that deals with the browser's local storage.
 */
@Injectable()
export class LocalStorageService {

    constructor() {
    }

    /**
     * Fetches the settings of a provided settings class. If it doesn't exist, create one
     * @param {typeof Settings} settingsClass The reference to the settings class to get settings from (ex:
     *                                        PaymentSettings).
     * @returns {T} The object containing the settings data.
     */
    public get <T extends Settings>(settingsClass: typeof Settings): T {
        const localStorageSettings: string = localStorage.getItem(settingsClass.key);
        let newSettings: Settings;
        if (!localStorageSettings) {
            newSettings = new settingsClass();
            localStorage.setItem(settingsClass.key, JSON.stringify(newSettings));
        }
        return newSettings || JSON.parse(localStorageSettings);
    }

}
