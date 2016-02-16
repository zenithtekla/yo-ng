'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:loginCtrl
 * @description
 * # loginCtrl
 * Controller of the workspaceApp
 */

angular.module('workspaceApp')
  .constant('FirebaseUrl_dataSet1', 'https://zetek.firebaseio.com/ds1')
  .factory('Auth', ['$firebaseAuth', '$firebaseArray', 'FirebaseUrl_dataSet1', function ($firebaseAuth, $firebaseArray, FirebaseUrl_dataSet1) {
    /* global Firebase */
    var ref = new Firebase(FirebaseUrl_dataSet1);
    var authObj = $firebaseAuth(ref);
    var authData = ref.getAuth();
    if (authData) {
        console.log("User " + authData.uid + " is logged in with " + authData.provider);
      } else {
        authObj.$authWithOAuthPopup("google").then(function(authData) {
          console.log("Logged in as:", authData.uid);
        }).catch(function(error) {
          console.log("Authentication failed:", error);
        });
    }
    
    return { 
      authObj : authObj, 
      ref: ref,
      authData: authData,
      logout: function(){
        authObj.$unauth();
        this.authData = false;
      }
    };
  }])
  .factory('preload', ['Auth', '$firebaseArray', function (Auth, $firebaseArray) {
    var service;
    if (Auth.authData){
        service = $firebaseArray(Auth.ref);
        console.log("preload: User " + Auth.authData.uid + " is logged in with " + Auth.authData.provider);
    }
    return {
      get: function(){
        return service;
      }
    };
  }])
  .controller('loginCtrl', function(){
      
  });