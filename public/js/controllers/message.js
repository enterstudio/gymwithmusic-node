angular.module('gymwithmusic.system').controller('MessageController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;

    $scope.global.messages = [];

    $scope.closeMessage = function(index) {
      $scope.global.messages.splice(index, 1);
    };

}]);
