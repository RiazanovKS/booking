import { includesList, removeFromList } from "../lib.js";


export default class MapFilter {
    #filters;
    #features;

    constructor() {
        this.#filters = {
            type: 'any',
            price: 'any',
            rooms: 'any',
            guests: 'any',
        }

        this.#features = [];
    }

    #setFilter = (key, value) => {
        if (!key in this.#filters) return;

        this.#filters[key] = value;
    }

    #addFeature(featureName) {
        this.#features.push(featureName);
    }

    #removeFeature(featureName) {
        removeFromList(featureName, this.#features);
    }

    #filterArticles(articles) {

        const {
            type,
            price,
            guests,
            rooms
        } = this.#filters;

        return articles.filter((article) => {

            const isMatchType = type === 'any' ? true : article.type === type;
            const isMatchPrice = this.#isMatchPrice(price, article.price.amount);
            const isMatchRooms = rooms === 'any' ? true : article.capacity.rooms == rooms;
            const isMatchGuests = guests === 'any' ? true : article.capacity.guests == guests;
            const isMatchFeatures = includesList(article.features, this.#features);

            return isMatchType
                && isMatchPrice
                && isMatchRooms
                && isMatchGuests
                && isMatchFeatures;
        })
    }

    #isMatchPrice(type, amount) {
        switch (type) {
            case 'any':
                return true;
            case 'low':
                return amount < 10000;
            case 'middle':
                return amount > 10000 && amount < 50000
            case 'high':
                return amount > 50000;
        }
    }

    filter({ event, articles }) {
        const filterMappings = {
            'housing-type': 'type',
            'housing-price': 'price',
            'housing-rooms': 'rooms',
            'housing-guests': 'guests',
        }

        const { name, value, checked, type } = event.target;

        switch (type) {
            case 'select-one':
                const key = filterMappings[name];
                this.#setFilter(key, value);
                break;
            case 'checkbox':
                checked === true ? this.#addFeature(value) : this.#removeFeature(value);
                break;
            default:
                throw new Error('Unrecognized input type handling');
        }

        const filteredArticles = this.#filterArticles(articles);

        return filteredArticles;
    }

}




