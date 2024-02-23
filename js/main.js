import articles from "./mock.js";
import { getRandomNumberInRange, separateThosands, declOfNum } from "./lib.js";

const Types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
};

const Features = {
    WIFI: 'wifi',
    DISHWASHER: 'dishwasher',
    PARKING: 'parking',
    WASHER: 'washer',
    ELEVATOR: 'elevator',
    CONDITIONER: 'conditioner'
};

const mapElement = document.querySelector('.map');
const mapPinsElement = document.querySelector('.map__pins');
const pinElementTemplate = document.querySelector('#pin');
const cardElementTemplate = document.querySelector('#card');
const mainPinElement = document.querySelector('.map__pin--main');
const adForm = document.querySelector('.ad-form');

const mapHeight = mapPinsElement.clientHeight;
const mapWidth = mapPinsElement.clientWidth;

mainPinElement.addEventListener('mousedown', () => {
    mapPinsElement.classList.remove('visually-hidden');
    mapElement.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled')
});

const createArticlePinElement = article => {
    const pin = pinElementTemplate.content.cloneNode(true).firstElementChild;
    const pinAvatar = pin.firstElementChild;

    pinAvatar.src = article.avatar;

    return pin;
}

const createCardElement = article => {
    const cardElement = cardElementTemplate.content.cloneNode(true).firstElementChild;

    const { rooms, guests } = article.capacity;

    const cardAvatar = cardElement.querySelector('.popup__avatar');
    const cardTitle = cardElement.querySelector('.popup__title');
    const cardAddress = cardElement.querySelector('.popup__text--address');
    const cardPrice = cardElement.querySelector('.popup__text--price');
    const cardType = cardElement.querySelector('.popup__type');
    const cardCapacity = cardElement.querySelector('.popup__text--capacity');
    const cardTime = cardElement.querySelector('.popup__text--time');
    const cardFeatures = cardElement.querySelector('.popup__features');

    cardFeatures.innerHTML = '';

    const featureElements = article.features.map(feature => {
        const featureElement = document.createElement('li');

        console.log({ feature });
        console.log({ Feature: Features[feature.toUpperCase()] })

        featureElement.classList.add('popup__feature', `popup__feature--${Features[feature.toUpperCase()]}`);

        return featureElement;
    });


    cardTitle.textContent = article.title;
    cardAddress.textContent = article.address;
    cardPrice.textContent = cardPrice.textContent.replace(/\d+/, separateThosands(article.price.amount));
    cardType.textContent = Types[article.type.toUpperCase()];
    cardCapacity.textContent = `${rooms} ${declOfNum(rooms, ['комната', 'комнаты', 'комнат'])} для ${guests} ${declOfNum(guests, ['гостя', 'гостей', 'гостей'])}.`
    cardTime.textContent = `Заезд после ${article.time.in}, выезд до ${article.time.out}.`;
    cardFeatures.append(...featureElements);


    cardAvatar.src = article.avatar;

    const closeButton = cardElement.querySelector('.popup__close');

    const imgPhoto = cardElement.querySelector('.popup__photo');

    const photosImg = article.photos.map(imageSrc => {
        const imgPhotoClone = imgPhoto.cloneNode();
        imgPhotoClone.src = imageSrc;

        return imgPhotoClone;
    });

    imgPhoto.replaceWith(...photosImg)

    closeButton.addEventListener('click', () => {
        cardElement.hidden = !cardElement.hidden;
    })

    cardElement.hidden = true;

    return cardElement;
}

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


const articlePins = [];
const articleCards = [];


articles.forEach(article => {

    const articlePinElement = createArticlePinElement(article);
    const articleCardElement = createCardElement(article);


    articlePinElement.addEventListener('click', () => {
        articleCardElement.hidden = !articleCardElement.hidden;
        articleCards.forEach(element => {
            if (articleCardElement !== element) {
                element.hidden = true;
            }
        });;
    })


    const pinLeft = getRandomNumberInRange({ to: mapWidth });
    const pinBottom = getRandomNumberInRange({ to: 230 });

    const { cardLeft, cardBottom } = getCardElementCoordsDueToPinElement({ pinLeft, pinBottom });


    articlePinElement.style.top = null;
    articlePinElement.style.left = pinLeft + 'px';
    articlePinElement.style.bottom = pinBottom + 'px';

    articleCardElement.style.bottom = cardBottom + 'px';
    articleCardElement.style.left = cardLeft + 'px';

    articlePins.push(articlePinElement);
    articleCards.push(articleCardElement);
});

mapPinsElement.append(...articlePins);
mapPinsElement.append(...articleCards);

