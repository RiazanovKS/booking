import { createCardElement, createPinElement } from "../article/lib.js";

export default class Map {

    #mapElement;
    #mapPinsElement;

    constructor({ mapElement, mapPinsElement }) {
        this.#mapElement = mapElement;
        this.#mapPinsElement = mapPinsElement;
    }

    activate() {
        this.#toggleActive(true);
    }

    deactivate() {
        this.#toggleActive(false);
    }

    #toggleActive(isActive) {
        this.#mapPinsElement.classList.toggle('visually-hidden', !isActive);
        this.#mapElement.classList.toggle('map--faded', !isActive);
    }

    drawArticleCard(article) {
        const cardElement = createCardElement(article);

        const { left, bottom } = article.coords;

        const { cardLeft, cardBottom } = this.#getCardElementCoordsDueToPinElement({ pinLeft: left, pinBottom: bottom });

        cardElement.style.left = cardLeft + 'px';
        cardElement.style.bottom = cardBottom + 'px';

        this.#mapPinsElement.append(cardElement);
    }

    drawPins(articles, onSelect) {
        this.removeAllPins();

        const mapPins = articles.map(article => {
            const pinElement = createPinElement(article);

            pinElement.style.top = null;
            pinElement.style.left = article.coords.left + 'px';
            pinElement.style.bottom = article.coords.bottom + 'px';

            pinElement.addEventListener('click', () => onSelect())

            return pinElement;
        });

        this.#mapPinsElement.append(...mapPins);
    }

    removeAllPins() {
        const pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        pins.forEach(pin => pin.remove());
    }
}















