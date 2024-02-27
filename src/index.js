import './css/normalize.css';
import './css/style.css';

import articles from "./js/mock.js";

import * as map from "./js/map.js";

map.init(articles);
map.draw();

