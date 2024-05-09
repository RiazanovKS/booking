export default class MainPin {

    #mainPinElement;

    constructor() { }

    init(onStart) {
        this.#mainPinElement = document.querySelector('.map__pin--main');

        this.#mainPinElement.addEventListener('mousedown', onStart);
    }

    destroy() {
        if (!this.#mainPinElement) return;

        this.#mainPinElement.removeEventListener('mousedown', onStart);

        this.#mainPinElement = undefined;
    }
}

