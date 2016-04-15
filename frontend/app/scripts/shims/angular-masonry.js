'use strict';

var $ = require('jquery');
require('jquery-bridget');

var Masonry = require('masonry-layout');
var ImagesLoaded = require('imagesloaded');

$.bridget('masonry', Masonry);
$.bridget('imagesLoaded', ImagesLoaded);

require('imports?angular!angular-masonry');

// require('ev-emitter');
// require('desandro-matches-selector');
// require('fizzy-ui-utils');
// require('get-size');
// require('outlayer/item');
// require('outlayer/outlayer');
// require('angular');
// require('angular-masonry');

module.exports = "wu.masonry";
