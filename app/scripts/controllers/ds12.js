(function(angular) {
'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:DataSheet2
 * @description
 * # DataSheet2
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
  .controller('DataSheet12', ['$scope', 'data', 'Alchemy', function ($scope, data, Alchemy) {
    $scope.ds12 = {
      entries: data,
      fn: 'custom_func',
      items: ['first', 'second', 'third'],
      selectedValue: 'first',
      data: {
        title: 'DataSheet12 - Flowchart Request!',
        start_date:"07-02-2015",
        end_date:"07-19-2015",
        total:16
      }
    };
    
    Alchemy.rune().then(function(data) {
      $scope.tpl_data = Object.assign(data,$scope.ds12.data);
    });
    
    $scope.new_entry = {
      customer: '',
      assembly: '',
      date_received: '',
      time_received: '',
      date_completed: '',
      time_completed: ''
    };
    
  /* // # Custom methods - Alchemy.fusion(data).method()
    // Method with non-filtered (nf) data
    console.log(Alchemy.fusion($scope.ds12.entries).ls_customer_nf());
    
    // Methods with filter data 1- filter 2- exec method
    var data_filtered = Alchemy.fusion($scope.ds12.entries).filter();
    
    console.log(Alchemy.fusion(data_filtered).ls_customer());
    
  */
    
    $scope.save = function(){
      // $scope.ds12.entries
    };
    $scope.insert = function(){
      console.log(angular.toJson($scope.new_entry));
      $scope.ds12.entries = $scope.ds12.entries.concat($scope.new_entry);
      $scope.new_entry = {
          customer: '',
          assembly: '',
          date_received: '',
          time_received: '',
          date_completed: '',
          time_completed: ''
      };
    };
}]);
})(window.angular);