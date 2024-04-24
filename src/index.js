import './css/normalize.css';
import './css/style.css';

import * as articlesService from "./js/article/mock.js";
import { init as mainPinInit } from './js/mainPin.js';

import Map from "./js/map/Map.js";
import MapFilter from './js/map/Filter.js'
import AdForm from './js/adForm.js';

const map = new Map();
const mapFilter = new MapFilter();
const adForm = new AdForm();

const articles = await articlesService.getArticles();

const filterForm = document.querySelector('.map__filters');

mainPinInit(() => {
    map.activate();
    adForm.activate();
});

map.drawArticlePins(articles);

filterForm.addEventListener('input', event => {
    const filteredArticles = mapFilter.filter({ event, articles });

    map.removeAllPins();
    map.drawArticlePins(filteredArticles);
});