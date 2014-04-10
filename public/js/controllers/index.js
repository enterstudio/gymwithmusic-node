'use strict';

angular.module('gymwithmusic.system').controller('IndexController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;

    $scope.$watch(function() { return $location.path(); }, function(newValue, oldValue){  
      if (!Global.user && newValue === '/admin/screen')
      {
          window.location = '/';
      }
      if (Global.user.admin == false && newValue === '/admin/screen'){  
          window.location = '/';
      }  
  });
}]);
