export default class MapFilter {

    #filter;
    #filterForm;
    #onFilterChange;

    constructor({ filterForm, filter, onFilterChange }) {
        this.#filterForm = filterForm;
        this.#onFilterChange = onFilterChange;
        
        this.#filter = filter;
        
        this.#filterForm.addEventListener('change', (event) => {
            this.onSetFilter(event);

            if (this.#onFilterChange) this.#onFilterChange();
        })
    }

    setFilterChangeHandler(callback) {
        this.#onFilterChange = callback;
    }

    getFilters() {
        const housingTypeSelect = document.querySelector('[name="housing-type"]');
        const housingPriceSelect = document.querySelector('[name="housing-price"]');
        const housingRoomsSelect = document.querySelector('[name="housing-rooms"]');
        const housingGuestsSelect = document.querySelector('[name="housing-guests"]');

        return {
            type: housingTypeSelect.value,
            price: housingPriceSelect.value,
            rooms: housingRoomsSelect.value,
            guests: housingGuestsSelect.value,
        }
    }

    onSetFilter(event) {
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
                this.#filter.setFilter(key, value);
                break;
            case 'checkbox':
                checked === true ? this.#filter.addFeature(value) : this.#filter.removeFeature(value);
                break;
            default:
                throw new Error('Unrecognized input type handling');
        }
    }
}
