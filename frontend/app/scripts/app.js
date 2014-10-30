'use strict';

angular.module('MyApp', [
  'restangular',
  'angularFileUpload',
  'ngMaterial',
  'ngClipboard',
  'wu.masonry'
]).config(function (RestangularProvider) {
  RestangularProvider.setBaseUrl('/api/v1');

}).config(['ngClipProvider', function (ngClipProvider) {
  ngClipProvider.setPath("libraries/ZeroClipboard.swf");

}]).run(function ($rootScope) {
  $rootScope.appName = "The Uploader ʕ◔ϖ◔ʔ";

}).controller('MainCtrl', function ($window, $timeout, $scope, $upload, Restangular, $mdSidenav) {
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

  $scope.$watch(function () {
    return self.files; // this is array
  }, function (files) {
    if (!Array.isArray(files) || files.length == 0) return;
    console.log(files);

    files.forEach(function (file) {
      generateThumb(file);
    });
  });

  function generateThumb(file) {
    if (file != null) {
      if (fileReaderSupported && file.type.indexOf('image') > -1) {
        $timeout(function () {
          var fileReader = new FileReader();
          fileReader.readAsDataURL(file);
          fileReader.onload = function (e) {
            $timeout(function () {
              file.dataUrl = e.target.result;
            });
          }
        });
      }
    }
  }

  this.openMenu = function () {
    $mdSidenav('left').toggle();
  };

  this.onCancel = function (index) {
    self.files.splice(index, 1);
  };

  this.onUpload = function (index) {
    var file = self.files[index];
    file.isUploading = true;

    $scope.upload = $upload.upload({
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