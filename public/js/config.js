'use strict';

//Setting up route
angular.module('gymwithmusic').config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // For unmatched routes:
    $urlRouterProvider.otherwise('/');

    // states for my app
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: '/views/index.html'
    })
      .state('admin host', {
        url: '/admin/screen',
        templateUrl: '/views/admin/screen.html'
    });
}
]);

//Setting HTML5 Location Mode
angular.module('gymwithmusic').config(['$locationProvider',
  function($locationProvider) {
    $locationProvider.html5Mode(true);
    //$locationProvider.hashPrefix('!');
}
]);
