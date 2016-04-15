'use strict';

var angular = require('angular');

angular.module('MyApp', [
  require("imports?angular,_=lodash!exports?'restangular'!restangular"),
  require('ng-file-upload'),
  require('angular-material'),
  require('imports?angular,ZeroClipboard=zeroclipboard!exports?"ngClipboard"!ng-clip'),
  require('./shims/angular-masonry'),
  require("./config"),
  require("./run"),
  require("./controller")
]);

