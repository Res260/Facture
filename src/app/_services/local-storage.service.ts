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
    public get <T extends Settings>(settingsClass: new () => T): T {
        const newSettings: Settings        = new settingsClass();
        const localStorageSettings: string = localStorage.getItem(newSettings.key);
        if (!localStorageSettings) {
            localStorage.setItem(newSettings.key, JSON.stringify(newSettings));
        }
        return JSON.parse(localStorageSettings) || newSettings;
    }

    /**
     * Saves the provided settings object in the local storage.
     * @param {Settings} settings The settings object to be saved.
     */
    public set (settings: Settings): void {
        localStorage.setItem(settings.key, JSON.stringify(settings));
    }

}
