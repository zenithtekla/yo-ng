'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:DataSheet15
 * @description
 * # DataSheet15
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('DataSheet15', ['$scope', 'data', function ($scope, data) {
    $scope.tpl_data = {
      title: 'DataSheet15 - Flowchart Request',
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
    $scope.ds15 = {
        entries: data,
        fn: 'custom_func',
        items: ['first', 'second', 'third'],
        selectedValue: 'first'
    };
    // console.log(JSON.stringify($scope.ds15.entries, null, "\t"));
}]);