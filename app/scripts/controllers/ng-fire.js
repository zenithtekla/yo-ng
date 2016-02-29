(function(angular) {
'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:Auth factories
 * @description
 * # Auth factories
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .constant('FirebaseUrl_userAuth', 'https://zetek.firebaseio.com/users')
  .constant('FirebaseUrl_dataSet1', 'https://zetek.firebaseio.com/ds1')
  .constant('FirebaseUrl_dataSet2', 'https://zetek.firebaseio.com/ds2')
  .constant('FirebaseUrl_dataSet3', 'https://zetek.firebaseio.com/ds3')
  .constant('FirebaseUrl_dataSet4', 'https://zetek.firebaseio.com/ds4')
  .constant('FirebaseUrl_dataSet5', 'https://zetek.firebaseio.com/ds5')
  .factory('Auth_userAccess', 
    [ '$location', '$firebaseAuth', 'FirebaseUrl_userAuth', '$q', 
    function ($location, $firebaseAuth, FirebaseUrl_userAuth, $q) {
    /* global Firebase */
    console.log($location.path());
    var service = {};
    service.ref = new Firebase(FirebaseUrl_userAuth);
    service.authObj = $firebaseAuth(service.ref);
    return service;
  }])
  .factory('Auth_datasheet1', 
    ['$location', '$firebaseAuth', 'FirebaseUrl_dataSet1', '$q', 
    function ($location, $firebaseAuth, FirebaseUrl_dataSet1, $q) {
    /* global Firebase */
    console.log($location.path());
    var service = {};
    service.ref = new Firebase(FirebaseUrl_dataSet1);
    service.authObj = $firebaseAuth(service.ref);
    return service;
  }])
  .factory('Auth_datasheet2', 
    ['$location', '$firebaseAuth', 'FirebaseUrl_dataSet2', '$q', 
    function ($location, $firebaseAuth, FirebaseUrl_dataSet2, $q) {
    /* global Firebase */
    var service = {};
    service.ref = new Firebase(FirebaseUrl_dataSet2);
    service.authObj = $firebaseAuth(service.ref);
    return service;
  }])
  .factory('Auth_datasheet3', 
    ['$location', '$firebaseAuth', 'FirebaseUrl_dataSet3', '$q', 
    function ($location, $firebaseAuth, FirebaseUrl_dataSet3, $q) {
    /* global Firebase */
    var service = {};
    service.ref = new Firebase(FirebaseUrl_dataSet3);
    service.authObj = $firebaseAuth(service.ref);
    return service;
  }])
  .factory('Auth_datasheet4', 
    ['$location', '$firebaseAuth', 'FirebaseUrl_dataSet4', '$q', 
    function ($location, $firebaseAuth, FirebaseUrl_dataSet4, $q) {
    /* global Firebase */
    var service = {};
    service.ref = new Firebase(FirebaseUrl_dataSet4);
    service.authObj = $firebaseAuth(service.ref);
    return service;
  }])
  .factory('Auth_datasheet5', 
    ['$location', '$firebaseAuth', 'FirebaseUrl_dataSet5', '$q', 
    function ($location, $firebaseAuth, FirebaseUrl_dataSet5, $q) {
    /* global Firebase */
    var service = {};
    service.ref = new Firebase(FirebaseUrl_dataSet5);
    service.authObj = $firebaseAuth(service.ref);
    return service;
  }])
  .factory('preload', 
    ['$injector', 'Auth_userAccess', '$firebaseArray', 'Auth_datasheet1', 'Auth_datasheet2', 'Auth_datasheet3', 'Auth_datasheet4', 'Auth_datasheet5', 
    function ($injector, Auth_userAccess, $firebaseArray, Auth_datasheet1, Auth_datasheet2, Auth_datasheet3, Auth_datasheet4, Auth_datasheet5) {
    var service;
    var fn ={
      import: function(whichAuth){
        whichAuth = 'Auth_' + whichAuth.toLowerCase();
        console.log(whichAuth);
        $injector.get(whichAuth).ref.onAuth(function(authData){
          if (authData) {
            console.log('// preload XHR');
            service = $firebaseArray($injector.get(whichAuth).ref);
            var str = (authData.email) ? authData.email : authData.uid;
            console.log("User " + str + " is logged in with " + authData.provider);
          } else {
            console.log("User not logged in");
          }
        });
      }
    };
    return {
      get: function(datasheet){
        fn.import(datasheet);
        return service;
      }
    };
  }]);
})(window.angular);