let mainPinElement;

export const init = (onStart) => {
    mainPinElement = document.querySelector('.map__pin--main');

    mainPinElement.addEventListener('mousedown', onStart);
}

export const destroy = () => {
    if (!mainPinElement) return;

    mainPinElement.removeEventListener('mousedown', onStart);

    mainPinElement = undefined;
}