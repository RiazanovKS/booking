const shuffleList = (list) => {
    return list.sort(() => Math.random() - 0.5);
}

export const includesList = (source, target) => {
    return target.every(elem => source.includes(elem));
}

export const removeFromList = (item, list) => {
    const index = list.indexOf(item);
    if (index > -1) {
        list.splice(index, 1);
    }
}

export const getRandomNumberInRange = ({ from = 0, to = 100 } = { from: 0, to: 100 }) => {
    const difference = to - from;
    return Math.floor(Math.random() * difference) + from;
}

export const getRandomElementFromList = list => {
    const randomNumber = getRandomNumberInRange({ to: list.length });

    return list[randomNumber];
}

export const getRandomSublist = (list) => {
    const shuffledList = shuffleList(list);

    const randomCount = getRandomNumberInRange({ to: list.length });

    return shuffledList.slice(0, randomCount);
}

export const separateThosands = (number, separator) => {
    separator ??= ' ';
    number = number.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(number))
        number = number.replace(pattern, `$1${separator}$2`);
    return number;
}

export const declOfNum = (value, words) => {
    value = Math.abs(value) % 100;
    var num = value % 10;
    if (value > 10 && value < 20) return words[2];
    if (num > 1 && num < 5) return words[1];
    if (num == 1) return words[0];
    return words[2];
}

