'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:DataSheet5
 * @description
 * # DataSheet5
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('DataSheet5', ['$scope', 'data', function ($scope, data) {
    $scope.tpl_data = {
      title: 'DataSheet5 - Flowchart Request',
      txt: {
        start: 'start',
        end: 'end',
        total: 'total'
      },
      start_date: '07-02-2015',
      end_date: '07-19-2015',
      total: 16,
      customer: 'customer',
      assembly: 'assembly',
      date_received: 'date_received',
      time_received: 'time_received',
      date_completed: 'date_completed',
      time_completed: 'time_completed'
    };
    $scope.ds5 = {
        entries: data,
        fn: 'custom_func',
        items: ['first', 'second', 'third'],
        selectedValue: 'first'
    };
    // console.log(JSON.stringify($scope.ds5.entries, null, "\t"));
}]);