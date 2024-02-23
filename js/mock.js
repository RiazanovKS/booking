import {
  getRandomSublist,
  getRandomNumberInRange,
  getRandomElementFromList
} from "./lib.js";

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];

const TIMES = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const avatars = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png'
]

const PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

const titles = [
  'Уютное гнездышко для молодоженов',
  'Самое лучшее место',
  'Почти как в Лондоне',
  'Что-то на японском',
  'Квартира вашей мечты',
  'Современность и утонченность',
  'Студенческий рай',
  'Холостяцкая берлога',
  'Уютное жилище в спокойном районе',
  'Уютное местечко с прекрасным видом',
];

const addresses = [
  '102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3',
  '1 Chome-7-17 Shintomi, Chuo City, Tokyo 104-0041',
  '2 Chome-2-3 Uchisaiwaicho, Chiyoda City, Tokyo 100-0011',
  '1 Chome-7-6 Shibakoen, Minato City, Tokyo 105-0011',
  '2 Chome-3-3 Shiba, Minato City, Tokyo 105-0014',
  '11 Naitomachi, Shinjuku City, Tokyo 160-0014',
  '1 Chome-5-27 Ikejiri, Setagaya City, Tokyo 154-0023',
  '5 Chome-5-7 Todoroki, Setagaya City, Tokyo 158-0082',
  '7-1 Ichibayamatocho, Tsurumi Ward, Yokohama, Kanagawa 230-0025',
  '5-chōme-9 Kōkandōri, Kawasaki Ward, Kawasaki, Kanagawa 210-0852',
  '1 Minatochō, Kawasaki Ward, Kawasaki, Kanagawa 210-0807'
];

const createArticle = () => ({
  avatar: getRandomElementFromList(avatars),
  title: getRandomElementFromList(titles),
  address: getRandomElementFromList(addresses),
  price: {
    amount: getRandomNumberInRange({ from: 1000, to: 70000 }),
    currency: 'RUB'
  },
  type: getRandomElementFromList(TYPES),
  capacity: {
    rooms: getRandomNumberInRange({ from: 1, to: 10 }),
    guests: getRandomNumberInRange({ from: 1, to: 10 })
  },
  time: {
    in: getRandomElementFromList(TIMES),
    out: getRandomElementFromList(TIMES)
  },
  features: getRandomSublist(FEATURES),
  description: getRandomElementFromList(titles),
  photos: getRandomSublist(PHOTOS)
})

let articles = [];

for (let i = 0; i < 10; i++) {
  articles.push(createArticle());
}

export default articles;