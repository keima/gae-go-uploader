'use strict';

var
  angular = require("angular"),
  moduleName = "MyApp.config"
  ;

angular.module(moduleName, [])
  .config(function(RestangularProvider) {
    RestangularProvider.setBaseUrl('/api/v1');
  })
  .config(function(ngClipProvider) {
    ngClipProvider.setPath("libraries/ZeroClipboard.swf");
  });

module.exports = moduleName;
