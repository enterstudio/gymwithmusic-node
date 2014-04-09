'use strict';

angular.module('gymwithmusic.system').controller('HeaderController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;
    
    if($location.path() !== '/signin' && $location.path() !== '/signup')
    {
        angular.element('html').removeClass('auth');
    }

    if(typeof Global.user !== 'undefined' && Global.user !== null){
        if(Global.user.admin){
            $scope.menu = [{
                'title': 'Word host',
                'link': 'admin/screen'
            }];
        }
    }

    $scope.$on('$locationChangeSuccess', function(){

        if($location.path() === '/admin/screen')
        {
            angular.element('html').addClass('admin');
        }
        else
        {
            angular.element('html').removeClass('admin');
        }
    });
    
    $scope.isCollapsed = false;
}]);
