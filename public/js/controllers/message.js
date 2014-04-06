'use strict';

angular.module('gymwithmusic.system').controller('MessageController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;

    $scope.global.messages = [];

    $scope.closeMessage = function(index) {
      $scope.global.messages.splice(index, 1);
    };

}]);
