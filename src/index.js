import './css/normalize.css';
import './css/style.css';

import * as articlesService from "./js/article/mock.js";
import MainPin from './js/mainPin.js';

import Map from "./js/map/Map.js";
import MapFilter from './js/map/MapFilter.js'
import AdForm from './js/adForm.js';

import Filter from './js/Filter.js';

const mapElement = document.querySelector('.map')
const mapPinsElement = document.querySelector('.map__pins');
const filterForm = document.querySelector('.map__filters');

const articles = await articlesService.getArticles();

const filter = new Filter();

const mainPin = new MainPin();
const map = new Map({ mapElement, mapPinsElement });
const mapFilter = new MapFilter({ filter, filterForm });
const adForm = new AdForm();

const filters = mapFilter.getFilters();

const filterPins = () => {
    const filteredArticles = filter.filter(articles);

    map.drawPins(filteredArticles);
}

mapFilter.setFilterChangeHandler(filterPins)

mainPin.init(() => {
    map.activate();
    adForm.activate();

    filterPins();
});

