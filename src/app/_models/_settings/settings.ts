/**
 * Model for any settings stored in local storage. All it needs is
 * a key to get it back.
 */
export abstract class Settings {
    public abstract key: string;
}
