/**
 * Model representing a dropdown element for PrimeNG's p-dropdown.
 */
export class DropdownElement<T> {
	public label: string;
	public value: T;

	constructor(label: string, value: T) {
		this.label = label;
		this.value = value;
	}
}
