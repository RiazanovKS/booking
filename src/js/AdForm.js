export default class AdForm {

    #adFormElement;

    constructor() {
        this.#adFormElement = document.querySelector('.ad-form');
    }

    activate() {
        this.#toggleActive(true);
    }

    deactivate() {
        this.#toggleActive(false);
    }

    #toggleActive(isActive) {
        console.log({ isActive })
        this.#adFormElement.classList.toggle('ad-form--disabled', !isActive)
    }
}