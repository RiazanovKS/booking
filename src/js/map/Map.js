import { createCardElement, createPinElement } from "../article/view.js";

export default class Map {

    #mapElement;
    #mapPinsElement;

    constructor() {
        this.#mapElement = document.querySelector('.map');
        this.#mapPinsElement = document.querySelector('.map__pins');
    }


    init() {
        return {
            activate: this.activate
        }
    }

    activate() {
        this.#mapPinsElement.classList.remove('visually-hidden');
        this.#mapElement.classList.remove('map--faded');
    }

    #getCardElementCoordsDueToPinElement(pinElementCoords) {
        const { pinLeft, pinBottom } = pinElementCoords;

        const mapWidth = this.#mapPinsElement.clientWidth;

        let cardLeft = pinLeft - 115 + 25;
        let cardBottom = pinBottom;

        if (cardLeft < 0) {
            cardLeft = 5;
        }

        if (cardLeft > (mapWidth - 230)) {
            cardLeft = mapWidth - 235;
        }

        if (cardBottom > 325) {
            cardBottom = 325;
        }

        return {
            cardLeft,
            cardBottom
        }
    }

    drawArticleCard(article) {
        const cardElement = createCardElement(article);

        const { left, bottom } = article.coords;

        const { cardLeft, cardBottom } = this.#getCardElementCoordsDueToPinElement({ pinLeft: left, pinBottom: bottom });

        cardElement.style.left = cardLeft + 'px';
        cardElement.style.bottom = cardBottom + 'px';

        this.#mapPinsElement.append(cardElement);
    }

    drawArticlePins(articles) {
        const mapPins = articles.map(article => {
            const pinElement = createPinElement(article);

            pinElement.style.top = null;
            pinElement.style.left = article.coords.left + 'px';
            pinElement.style.bottom = article.coords.bottom + 'px';

            pinElement.addEventListener('click', () => this.drawArticleCard(article))

            return pinElement;
        });

        this.#mapPinsElement.append(...mapPins);
    }

    removeAllPins() {
        const pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');

        pins.forEach(pin => pin.remove());
    }
}















