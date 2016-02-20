(function(angular) {
'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:DataSheet14
 * @description
 * # DataSheet14
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('DataSheet14', ['$scope', 'preload', 'Alchemy', '$firebaseArray', function ($scope, preload, Alchemy, $firebaseArray) {
    $scope.ds14 = {
      entries: preload.get(),
      fn: 'custom_func',
      items: ['first', 'second', 'third'],
      selectedValue: 'first',
      data: {
        title: 'DataSheet14 - Flowchart Request',
        start_date:"07-02-2015",
        end_date:"07-19-2015",
        total:16
      }
    };
    
    Alchemy.rune().then(function(data) {
      $scope.tpl_data = Object.assign(data,$scope.ds14.data);
    });
    
    $scope.new_entry = {
      customer: '',
      assembly: '',
      date_received: '',
      time_received: '',
      date_completed: '',
      time_completed: ''
    };

    $scope.insert = function(){
      console.log(angular.toJson($scope.new_entry));
      $scope.ds14.entries.$add($scope.new_entry);
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