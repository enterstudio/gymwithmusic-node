'use strict';

angular.module('gymwithmusic.system').controller('AdminController', ['$scope', 'Global', function ($scope, Global) {
    $scope.global = Global;
    $scope.test = 'Test';
}]);
