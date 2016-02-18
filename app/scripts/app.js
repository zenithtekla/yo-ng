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
      templateUrl: 'views/datasheet2.html',
      controller: 'DataSheet2',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            return response.data;
          });
        }]
      }
    })
    .state('datasheet3', {
      url: '/datasheet3',
      templateUrl: 'views/datasheet3.html',
      controller: 'DataSheet3',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
            return response.data;
          });
        }]
      }
    })
    .state('datasheet4', {
      url: '/datasheet4',
      templateUrl: 'views/datasheet4.html',
      controller: 'DataSheet4'
    })
    .state('datasheet5', {
      url: '/datasheet5',
      templateUrl: 'views/datasheet5.html',
      controller: 'DataSheet5',
      resolve: {
        data : ['$http', function($http){
          return $http.get('/api/data.json').then(function(response){
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
