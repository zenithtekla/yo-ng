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

  /*return {
    getWeather: function() {
        // the $http API is based on the deferred/promise APIs exposed by the $q service
        // so it returns a promise for us by default
        return $http.get('http://fishing-weather-api.com/sunday/afternoon')
            .then(function(response) {
                if (typeof response.data === 'object') {
                    return response.data;
                } else {
                    // invalid response
                    return $q.reject(response.data);
                }
            }, function(response) {
                // something went wrong
                return $q.reject(response.data);
            });
    }
  };*/
  .controller('MainCtrl', 
    ['$scope', 'Auth_userAccess', '$q', 
    function ($scope, Auth_userAccess, $q) {

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