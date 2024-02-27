import { separateThosands, declOfNum, getRandomNumberInRange } from "./lib.js";



const types = {
    PALACE: 'Дворец',
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало'
};

const features = {
    WIFI: 'wifi',
    DISHWASHER: 'dishwasher',
    PARKING: 'parking',
    WASHER: 'washer',
    ELEVATOR: 'elevator',
    CONDITIONER: 'conditioner'
};

export const createPinElement = article => {
    const pinElementTemplate = document.querySelector('#pin');

    const pin = pinElementTemplate.content.cloneNode(true).firstElementChild;
    const pinAvatar = pin.firstElementChild;

    pinAvatar.src = article.avatar;

    return pin;
}

export const createCardElement = article => {
    const cardElementTemplate = document.querySelector('#card');

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

        featureElement.classList.add('popup__feature', `popup__feature--${features[feature.toUpperCase()]}`);

        return featureElement;
    });


    cardTitle.textContent = article.title;
    cardAddress.textContent = article.address;
    cardPrice.textContent = cardPrice.textContent.replace(/\d+/, separateThosands(article.price.amount));
    cardType.textContent = types[article.type.toUpperCase()];
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
        cardElement.hidden = true;
    })

    return cardElement;
}