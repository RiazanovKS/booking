export default class ArticleFilter {
    constructor(
        articles
    ) {
        this.articles = articles;

        this.price = 'any';
        this.houseType = 'any';
        this.guests = 'any';
        this.rooms = 'any';

        this.wifi = false;
        this.dishwasher = false;
        this.parking = false;
        this.washer = false;
        this.elevator = false;
        this.conditioner = false;
    }

    setPrice(price) {
        this.price = price;

        this.filter();
    }

    setHouseType(houseType) {
        console.log({ houseType })

        this.houseType = houseType;

        this.filter();
    }

    setGuests(guests) {
        this.guests = guests;

        this.filter();
    }

    setRooms(rooms) {
        this.rooms = rooms;

        this.filter();
    }

    setWifi(wifi) {
        this.wifi = wifi;

        this.filter();
    }

    setDishwasher(dishwasher) {
        this.dishwasher = dishwasher;

        this.filter();
    }

    setParking(parking) {
        this.parking = parking;

        this.filter();
    }

    setWasher(washer) {
        this.washer = washer;

        this.filter();
    }

    setElevator(elevator) {
        this.elevator = elevator;

        this.filter();
    }

    setConditioner(conditioner) {
        this.conditioner = conditioner;

        this.filter();
    }





    filter() {
        this.articles.forEach((articleItem) => {
            const { article } = articleItem;
            const articlePinElement = articleItem.pin.element;

            const features = article.features;

            const isMatchHouseType = this.houseType === 'any' ? true : article.type === this.houseType;
            const isMatchPrice = this.isMatchPrice(this.price, article.price.amount);
            const isMatchRooms = this.rooms === 'any' ? true : article.capacity.rooms == this.rooms;
            const isMatchGuests = this.guests === 'any' ? true : article.capacity.guests == this.guests;

            const isMatchWifi = this.wifi == false ? true : features.includes('wifi');
            const isMatchDishwasher = this.dishwasher == false ? true : features.includes('dishwasher');
            const isMatchParking = this.parking == false ? true : features.includes('parking');
            const isMatchWasher = this.washer == false ? true : features.includes('washer');
            const isMatchElevator = this.elevator == false ? true : features.includes('elevator');
            const isMatchConditioner = this.conditioner == false ? true : features.includes('conditioner');


            console.log(this.wifi);

            const isMatchFilters =
                isMatchHouseType
                && isMatchPrice
                && isMatchRooms
                && isMatchGuests
                && isMatchWifi
                && isMatchDishwasher
                && isMatchParking
                && isMatchWasher
                && isMatchElevator
                && isMatchConditioner;

            articlePinElement.hidden = (isMatchFilters ? false : true);

        })
    }

    isMatchPrice(type, amount) {
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