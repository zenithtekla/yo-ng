(function(angular) {
'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .constant('FirebaseUrl_dataSet1', 'https://zetek.firebaseio.com/ds1')
  .factory('Alchemy', ['$http', function($http){
    return {
      rune: function(){
        return $http.get('/api/tpl_data.json').then(function(response) {
            return response.data;
        });
      },
      fusion: function (data) {
        var fn = {
          filter: function(){
            var idx = Object.keys(data[0]);
            if (idx[idx.length-1].indexOf("hash") > -1)
              idx.pop();
            var o = {};
            for (var tag of idx){
              o[tag] = [];
              data.map(function(d){
                o[tag].push(d[tag]);
              });
            }
            return o;
          },
          ls_customer_nf: function(){
            return data.map(function(d){
              var a = [];
              a.push(d.customer);
              return a;
            });
              // return data.customer.valueOf(); // favored for listing
          },
          ls_customer: function(){
            return data.customer;
          },
          customer: function(x){
            if (typeof x === 'object') {
              x = x || {};
              data.customer = data.customer.concat(x);
              return data.customer;
            } else
              return data.customer[x];
          },
          del_customer: function(x, y){
            y = y || 1;
            return data.customer.splice(x,y);
          },
          ls_assembly: function(){
            return data.assembly;
          },
          assembly: function(x){
            if (typeof x === 'object') {
              data.assembly = data.assembly.concat(x);
              return data.assembly;
            } else
              return data.assembly[x];
          },
          del_assembly: function(x, y){
            y = y || 1;
            return data.assembly.splice(x,y);
          }
        };
        return fn;
      }
    };
  }])
  .factory('Auth', function ($firebaseAuth, FirebaseUrl_dataSet1, $q) {
    /* global Firebase */
    var service = {};
    service.ref_ds1 = new Firebase(FirebaseUrl_dataSet1);
    service.authObj = $firebaseAuth(service.ref_ds1);
    /*service.login = function(user){
      var deferred = $q.defer();
      service.ref_ds1.authWithPassword(user).then(function(authData) {
        console.log(authData);
        // authData.email = $scope.user.email;
        var str = user.email.split("@")[0] + "!";
        console.log(str);
        fn.greet(", welcome " + str);
        document.getElementById("test").innerHTML = "my text [" + user.email.split("@")[0] + " ]";
        // window.location.reload(true);
      }).catch(function(error) {
          fn.alert(error);
          cb();
      });
    };*/
    return service;
  })
  /*.factory('AuthIn', ['Auth', "$q", function (Auth, $q){
    var service = {
      login: function(user){
        var deferred = $q.defer();
        service.ref_ds1.authWithPassword({
          email: user.email,
          password: user.password
          }, function(authData) {
          console.log(authData);
          // authData.email = $scope.user.email;
          var str = user.email.split("@")[0] + "!";
          console.log(str);
          fn.greet(", welcome " + str);
          document.getElementById("test").innerHTML = "my text [" + user.email.split("@")[0] + " ]";
          // window.location.reload(true);
        }).catch(function(error) {
            fn.alert(error);
            cb();
        });
      }
    };
  }])*/
  .factory('preload', ['Auth', '$firebaseArray', function (Auth, $firebaseArray) {
    var service;
    Auth.ref_ds1.onAuth(function(authData){
      if (authData) {
        service = $firebaseArray(Auth.ref_ds1);
        var str = (authData.email) ? authData.email : authData.uid;
        console.log("User " + str + " is logged in with " + authData.provider);
      } else {
        console.log("User not logged in");
      }
    });
    return {
      get: function(){
        return service;
      }
    };
  }])
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
  .controller('ModalViewInit', function($scope, $location, $uibModal, Auth, $log){
    $scope.login_google = function($event){ $event.preventDefault();
      if (Auth.ref_ds1.getAuth()) return;
      Auth.authObj.$authWithOAuthPopup("google").then(function(authData) {
        console.log("Logged in as:", authData.uid);
        $location.path('#');
        // there must be a better way to load data on login without reloading the whole page.
        // $location.url('/module/:module');
      }).catch(function(error) {
        console.log("Authentication failed:", error);
      });
    };
    
    $scope.logout = function($event){ $event.preventDefault();
      if (!Auth.ref_ds1.getAuth()) return;
      Auth.authObj.$unauth();
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
        $location.path('#');
      }, function(){
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
  })
  .controller('ModalInstCtrl', ['$scope', 'Auth', '$q', '$uibModalInstance', function ($scope, Auth, $q, $uibModalInstance) {
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
        Auth.ref_ds1.createUser(user, function(error, userData) {
          if (error) {
            fn.alert("Error creating user: " + error);
          } else {
            fn.alert("Successfully created user account with " + user.email);
          }
        });
      },
      login: function(user, cb){
        if (Auth.ref_ds1.getAuth()) return;
        
        if (!user.password) {
          fn.alert("please type password");
          return;
        }
        if (fn.valid_email(user.email))
        Auth.ref_ds1.authWithPassword(user).then(function(authData) {
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
  .controller('MainCtrl', ['$scope', 'Auth', '$q', function ($scope, Auth, $q) {

    /*$scope.openModal = function($event, size){
      $event.preventDefault();
      var modalInstance = $modal.open({
  		  templateUrl: 'myModalContent2.html',
  		  controller: ModalInstanceCtrl,
  		  size: size,
  		  scope: $scope
  		});
    };
    
    var ModalInstanceCtrl = function ($scope, $modalInstance) {
      $scope.ok = function () {
    	  console.log('var var: '+$scope.VARCONTROLLER);
    	  $modalInstance.close('closed result');
      };
      $scope.cancel = function () {
      	console.log('cancel cancel');
      	$modalInstance.dismiss('cancel');
	    };
	  };*/
	  
  }]);
})(window.angular);