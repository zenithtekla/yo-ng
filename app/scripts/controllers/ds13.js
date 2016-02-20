'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:DataSheet13
 * @description
 * # DataSheet13
 * Controller of the workspaceApp
 */
angular.module('workspaceApp')
  .controller('TplCtrl', function($scope){
    // loading templates, modal templates
    $scope.mydata = 'common data';
    $scope.templates = [
      { name: 'md1.html', url: 'views/modals/md1.html'},
      { name: 'md2.html', url: 'views/modals/md2.html'}
    ];
    $scope.template = $scope.templates[0];
  })
  .controller('DataSheet13', ['$scope', 'data', function ($scope, data) {
    $scope.tpl_data = {
      title: 'DataSheet13 - Flowchart Request',
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
    $scope.ds13 = {
        entries: data,
        fn: 'custom_func',
        items: ['first', 'second', 'third'],
        selectedValue: 'first'
    };
    // console.log(JSON.stringify($scope.ds13.entries, null, "\t"));
}]);