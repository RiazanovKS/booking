import { createCardElement } from "./lib.js";

export default class Popup {

    #container;
    #elem;

    constructor(container) {
        this.#container = container;
    }

    draw(article) {
        this.hide();

        const element = createCardElement(article);
    }

    hide() {
        if (this.#elem) {
            //@TODO Если не null, то задать null явно
            this.#elem.remove();
        }
    }

    #getCardElementCoordsDueToPinElement(pinElementCoords) {
        const { pinLeft, pinBottom } = pinElementCoords;

        const mapWidth = this.#container.clientWidth;

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


}