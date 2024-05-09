import { includesList, removeFromList } from "../js/lib.js";

export default class Filter {
    #filters;
    #features;

    constructor({ filters, features } = {
        filters: {
            type: 'any',
            price: 'any',
            rooms: 'any',
            guests: 'any'
        },
        features: []
    }) {
        this.#filters = filters;
        this.#features = features;
    }

    getFilters() {
        return {
            filters: this.#filters,
            features: this.#features
        }
    }

    setFilter = (key, value) => {
        if (!key in this.#filters) return;

        this.#filters[key] = value;
    }

    addFeature(featureName) {
        this.#features.push(featureName);
    }

    removeFeature(featureName) {
        removeFromList(featureName, this.#features);
    }

    filter(articles, callabk) {

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



}




