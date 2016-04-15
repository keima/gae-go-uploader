'use strict';

var
  angular = require("angular"),
  moduleName = "MyApp.run"
  ;

angular.module(moduleName, [])
  .run(function($rootScope) {
    $rootScope.appName = "The Uploader ʕ◔ϖ◔ʔ";
  });

module.exports = moduleName;
