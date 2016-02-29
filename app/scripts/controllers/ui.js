(function(angular) {
'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:User Interaction
 * @description
 * # User Interaction
 * Controller of the workspaceApp
 */
 angular.module('workspaceApp')
 /*  .controller('ModalInit', function($scope, $uibModal, $log){
    $scope.items = ['item1', 'item2', 'item3'];
    $scope.animationsEnabled = true;
    $scope.open = function(size){
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl',
        size: size,
        resolve: {
          items: function(){
            return $scope.items;
          }
        }
      });
     
      modalInstance.result.then(function(selectedItem){
        $scope.selected = selectedItem;
      }, function(){
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    
    $scope.toggleAnimation = function () {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  })*/
  .controller('ModalViewInit', 
    ['$scope', '$location', '$uibModal', 'Auth_userAccess', '$log', 
    function($scope, $location, $uibModal, Auth_userAccess, $log){
    
    $scope.login_google = function($event){ $event.preventDefault();
      if (Auth_userAccess.ref.getAuth()) return;
      Auth_userAccess.authObj.$authWithOAuthPopup("google").then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path('/');
        // there must be a better way to load data on login without reloading the whole page.
        // $location.url('/module/:module');
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    };
    
    $scope.logout = function($event){ $event.preventDefault();
      if (!Auth_userAccess.ref.getAuth()) return;
      Auth_userAccess.authObj.$unauth();
      window.location.reload(false);
    };
    
    $scope.openModal = function(size){
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'oneModalContent.jade',
        controller: 'ModalInstCtrl',
        size: '',
        resolve: {
          greet: function(){
            return $scope.greet;
          }
        }
      });
      
      modalInstance.result.then(function(user){
        $scope.greeting = user.greeting;
        console.log( "modalInstance.result ", $scope.greeting);
        $location.path('/');
      }, function(){
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  }])
  .controller('ModalInstCtrl', 
    ['$scope', 'Auth_userAccess', '$q', '$uibModalInstance', 
    function ($scope, Auth_userAccess, $q, $uibModalInstance) {
    
    $scope.user = {};
  
    $scope.close = function () {
      $uibModalInstance.dismiss('cancel');
    };
    
    $scope.login = function($event){ $event.preventDefault();
      // console.log("cond ", cond, ".checkbox.signup ", $scope.checkbox.signup);
      fn.login($scope.user, function(){
        console.log($scope.checkbox.signup);
        if ($scope.checkbox.signup) fn.signup($scope.user);
      });
    };
    
    $scope.signup = function($event){ $event.preventDefault();
      // console.log("cond ", cond, ".checkbox.signup ", $scope.checkbox.signup);
      fn.signup($scope.user);
    };
    
    // custom methods
    var fn = {
      alert: function(msg){
        console.log(msg);
        $scope.$evalAsync(function(){
          $scope.user.alert = msg;
        });
      },
      greet: function(msg){
        $scope.$evalAsync(function(){
        $scope.user.greeting = msg;
        });
      },
      signup: function(user){
        if (!user.password) {
          fn.alert("please type password");
          return;
        }
        if (fn.valid_email(user.email))
        Auth_userAccess.ref.createUser(user, function(error, userData) {
          if (error) {
            fn.alert("Error creating user: " + error);
          } else {
            fn.alert("Successfully created user account with " + user.email);
          }
        });
      },
      login: function(user, cb){
        if (Auth_userAccess.ref.getAuth()) return;
        
        if (!user.password) {
          fn.alert("please type password");
          return;
        }
        if (fn.valid_email(user.email))
        Auth_userAccess.ref.authWithPassword(user).then(function(authData) {
          // authData.email = $scope.user.email;
          $scope.user.name = user.email.split("@")[0] + "!";
          fn.greet("welcome " + $scope.user.name);
          $scope.user.greeting = "{ user: "+ $scope.user.name +" }";
          console.log($scope.user.greeting);
          $uibModalInstance.close($scope.user);
        }).catch(function(error) {
            fn.alert(error);
            cb();
        });
      },
      valid_email: function(email){
        if (!email) {
          fn.alert("please enter your login email!");
          return;
        }
        var cond = false;
        var v = ["gmail", "mail", "ymail", "yahoo", "eminc"];
        for (var i of v){
          if (email.indexOf("@"+i) > -1) {
            cond = true;
            continue;
          }
        }
        if (!cond) {
          fn.alert("invalid_email: " + email);
        }
        return cond;
      }
    };
  }])
/*  .controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, items) {
    $scope.items = items;
    $scope.selected = {
      item: $scope.items[0]
    };
  
    $scope.ok = function () {
      $uibModalInstance.close($scope.selected.item);
    };
  
    $scope.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  })*/
})(window.angular);