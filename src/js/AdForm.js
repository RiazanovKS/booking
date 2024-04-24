export default class AdForm {

    #adFormElement;

    constructor() {
        this.#adFormElement = document.querySelector('.ad-form');
    }


    activate() {
        this.#adFormElement.classList.remove('ad-form--disabled')
    }
}