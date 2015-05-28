'use strict';

angular.module('MyApp', [
  'restangular',
  'ngFileUpload',
  'ngMaterial',
  'ngClipboard',
  'wu.masonry'
]).config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');

}).config(['ngClipProvider', function (ngClipProvider) {
  ngClipProvider.setPath("libraries/ZeroClipboard.swf");

}]).run(function ($rootScope) {
  $rootScope.appName = "The Uploader ʕ◔ϖ◔ʔ";

}).controller('MainCtrl', function ($window, $timeout, $scope, Upload, Restangular, $mdSidenav) {
  var self = this;

  var fileReaderSupported = $window.FileReader != null && ($window.FileAPI == null || FileAPI.html5 != false);

  this.images = [];
  this.isError = false;

  function init() {
    Restangular.all('images').getList()
      .then(function (result) {
        self.images = result;
      }, function () {
        self.isError = true;
      });
  }
  init();

  this.openMenu = function () {
    $mdSidenav('left').toggle();
  };

  this.onCancel = function (index) {
    self.files.splice(index, 1);
  };

  this.onUpload = function (index) {
    var file = self.files[index];
    file.isUploading = true;

    $scope.upload = Upload.upload({
      url: '/api/upload',
      method: 'POST',
      file: file,
      fileFormDataName: 'imagedata'
    }).progress(function (evt) {
      file.progress = parseInt(100.0 * evt.loaded / evt.total);
    }).success(function (data, status, headers, config) {
      self.files.splice(index, 1);
      $timeout(init, 3000);
    }).error(function () {
      file.isUploading = false;
    });

  };

})
;