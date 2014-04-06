'use strict';

angular.module('gymwithmusic.system').controller('HeaderController', ['$scope', 'Global', '$location', function ($scope, Global, $location) {
    $scope.global = Global;

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
            angular.element('body').addClass('admin');
        }
        else
        {
            angular.element('body').removeClass('admin');
        }
    });
    
    $scope.isCollapsed = false;
}]);
