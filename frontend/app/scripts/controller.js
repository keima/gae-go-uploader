'use strict';

var
  angular = require("angular"),
  moduleName = "MyApp.ctrl"
  ;

angular.module(moduleName, [])
  .controller("MainCtrl", require("./ctrl/main"))
;

module.exports = moduleName;
