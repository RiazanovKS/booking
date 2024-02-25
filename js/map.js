import { getRandomNumberInRange } from "./lib.js";

import { createCardElement, createPinElement } from "./article.js";
import ArticleFilter from "./filter.js";

const mapElement = document.querySelector('.map');
const mapPinsElement = document.querySelector('.map__pins');
const mainPinElement = document.querySelector('.map__pin--main');

// Filters
const filterForm = document.querySelector('.map__filters');

//      Types
const houseTypeSelect = filterForm.querySelector('select[name="housing-type"]');
const housePriceSelect = filterForm.querySelector('select[name="housing-price"]');
const houseRoomsSelect = filterForm.querySelector('select[name="housing-rooms"]');
const houseGuestsSelect = filterForm.querySelector('select[name="housing-guests"]');

//      Features
const wifiRadioButton = filterForm.querySelector('#filter-wifi');
const dishwasherRadioButton = filterForm.querySelector('#filter-dishwasher');
const parkingRadioButton = filterForm.querySelector('#filter-parking');
const washerRadioButton = filterForm.querySelector('#filter-washer');
const elevatorRadioButton = filterForm.querySelector('#filter-elevator');
const conditionerRadioButton = filterForm.querySelector('#filter-conditioner');

const adForm = document.querySelector('.ad-form');

const mapHeight = mapPinsElement.clientHeight;
const mapWidth = mapPinsElement.clientWidth;


const getCardElementCoordsDueToPinElement = (pinElementCoords) => {
    const { pinLeft, pinBottom } = pinElementCoords;

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


let articlesStore;
let articleFilter;

export const init = articles => {

    mainPinElement.addEventListener('mousedown', () => {
        mapPinsElement.classList.remove('visually-hidden');
        mapElement.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled')
    });

    articlesStore = articles.map(article => {

        const pinElement = createPinElement(article);
        const cardElement = createCardElement(article);

        cardElement.hidden = true;

        pinElement.addEventListener('click', () => {
            cardElement.hidden = false;
        });

        const pinLeft = getRandomNumberInRange({ to: mapWidth });
        const pinBottom = getRandomNumberInRange({ to: 230 });

        pinElement.style.top = null;
        pinElement.style.left = pinLeft + 'px';
        pinElement.style.bottom = pinBottom + 'px';

        const { cardLeft, cardBottom } = getCardElementCoordsDueToPinElement({ pinLeft, pinBottom });

        cardElement.style.left = cardLeft + 'px';
        cardElement.style.bottom = cardBottom + 'px';

        return {
            article,
            pin: {
                coords: {
                    left: pinLeft,
                    bottom: pinBottom
                },
                element: pinElement
            },
            card: {
                coords: {
                    left: cardLeft,
                    bottom: cardBottom
                },
                element: cardElement
            }
        }
    });

    articleFilter = new ArticleFilter(articlesStore);
}




houseTypeSelect.addEventListener('change', (event) => {
    articleFilter.setHouseType(event.target.value);
});

housePriceSelect.addEventListener('change', (event) => {
    articleFilter.setPrice(event.target.value);
});

houseRoomsSelect.addEventListener('change', (event) => {
    articleFilter.setRooms(event.target.value);
});

houseGuestsSelect.addEventListener('change', (event) => {
    articleFilter.setGuests(event.target.value);
});

wifiRadioButton.addEventListener('change', (event) => {
    articleFilter.setWifi(event.target.checked);
})

dishwasherRadioButton.addEventListener('change', (event) => {
    articleFilter.setDishwasher(event.target.checked);
})

parkingRadioButton.addEventListener('change', (event) => {
    articleFilter.setParking(event.target.checked);

})

washerRadioButton.addEventListener('change', (event) => {
    articleFilter.setWasher(event.target.checked);
})

elevatorRadioButton.addEventListener('change', (event) => {
    articleFilter.setElevator(event.target.checked);
})

conditionerRadioButton.addEventListener('change', (event) => {
    articleFilter.setConditioner(event.target.checked);
})


export const draw = () => {
    const { pins, cards } = articlesStore.reduce((acc, article) => {
        const { pins, cards } = acc;

        const pinElement = article.pin.element;
        const cardElement = article.card.element;

        pins.push(pinElement);
        cards.push(cardElement);

        return acc;

    }, { pins: [], cards: [] });

    console.log({ pins, cards });

    mapPinsElement.append(...pins, ...cards);
}

export const filter = () => {

}