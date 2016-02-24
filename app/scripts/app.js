'use strict';

/**
 * @ngdoc overview
 * @name workspaceApp
 * @description
 * # workspaceApp
 *
 * Main module of the application. // 'ui.bootstrap',
 */
angular
  .module('workspaceApp', [
    'ui.router',
    'ngAnimate',
    'ui.bootstrap',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'firebase'
  ])
  .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.when('', '/');  
  $urlRouterProvider.otherwise('/404');
  $stateProvider
    .state('main', {
      url: '/',
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .state('datasheet1', {
      // abstract: true,
      url: '/datasheet1',
      name: 'ds1',
      // see ui-route for multiple & Named Views
      templateUrl: 'views/datasheet1.html',
      controller: 'DataSheet1',
      /*data: {
        customData1: 44,
        customData2: "red"
      }, // attached customData to state object 
      // controllerProvider :" to dynamically return a controller function or string for you"
      */
    })
    .state('datasheet2', {
      url: '/datasheet2',
      name: 'ds2',
      templateUrl: 'views/datasheet2.html',
      controller: 'DataSheet2',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('datasheet3', {
      url: '/datasheet3',
      name: 'ds3',
      templateUrl: 'views/datasheet3.html',
      controller: 'DataSheet3',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('datasheet4', {
      url: '/datasheet4',
      name: 'ds4',
      templateUrl: 'views/datasheet4.html',
      controller: 'DataSheet4',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('datasheet5', {
      url: '/datasheet5',
      name: 'ds5',
      templateUrl: 'views/datasheet5.html',
      controller: 'DataSheet5',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('datasheet12', {
      url: '/datasheet12',
      name: 'ds12',
      templateUrl: 'views/datasheet12.html',
      controller: 'DataSheet12',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('datasheet13', {
      url: '/datasheet13',
      name: 'ds13',
      templateUrl: 'views/datasheet13.html',
      controller: 'DataSheet13',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('datasheet14', {
      url: '/datasheet14',
      name: 'ds14',
      templateUrl: 'views/datasheet14.html',
      controller: 'DataSheet14'
    })
    .state('datasheet15', {
      url: '/datasheet15',
      name: 'ds15',
      templateUrl: 'views/datasheet15.html',
      controller: 'DataSheet15',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            console.log('// data.json XHR');
            return response.data;
          });
        }]
      }
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'views/contact.html'
    })
    .state('404', {
      url: '/404',
      templateUrl: '/404.html'
    })
    /*.state('login', {
      url: '/login',
      // templateUrl: 'views/login.html',
      controller: 'loginCtrl'
    });*/
  }]);
