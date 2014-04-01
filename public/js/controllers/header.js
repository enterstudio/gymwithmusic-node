'use strict';

angular.module('gymwithmusic.system').controller('HeaderController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;

    if(typeof user !== 'undefined' && user !== null){
        if(user.admin){
            $scope.menu = [{
                'title': 'Word host',
                'link': 'admin/screen'
            }];
        }
    }

    $scope.$on('$locationChangeSuccess', function(){
        if($location.path() === '/admin/screen')
        {
            $('body').addClass('admin');
        }
        else
        {
            $('body').removeClass('admin');
        }
    });
    
    $scope.isCollapsed = false;
}]);
