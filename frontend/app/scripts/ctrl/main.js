'use strict';


module.exports = function($window, $timeout, $scope, Upload, Restangular, $mdSidenav) {
  var self = this;

  this.images = [];
  this.files = [];
  this.isError = false;

  function init() {
    Restangular.all('images').getList()
      .then(function(result) {
        self.images = result;
      }, function() {
        self.isError = true;
      });
  }

  init();

  this.openMenu = function() {
    $mdSidenav('left').toggle();
  };

  this.onCancel = function(index) {
    self.files.splice(index, 1);
  };

  this.onUpload = function(index) {
    var file = self.files[index];
    file.isUploading = true;

    $scope.upload = Upload.upload({
      url: '/api/upload',
      method: 'POST',
      data: {
        imagedata: file
      }
    }).progress(function(evt) {
      file.progress = parseInt(100.0 * evt.loaded / evt.total);
    }).success(function(data, status, headers, config) {
      self.files.splice(index, 1);
      $timeout(init, 3000);
    }).error(function() {
      file.isUploading = false;
    });

  };
};