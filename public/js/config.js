'use strict';

//Setting up route
angular.module('gymwithmusic').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/views/index.html'
    })
      .state('admin host', {
        url: '/admin/screen',
        templateUrl: '/views/admin/screen.html',
        data: {
          rule: function(user) {
            if(user.admin)
            {
              return true;
            }
            else
            {
              return false;
            }
          }
        }
    });

    // For unmatched routes:
    $urlRouterProvider.otherwise('/');
}
]);

//Setting HTML5 Location Mode
angular.module('gymwithmusic').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
}
]);
