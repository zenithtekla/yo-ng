(function(angular) {
'use strict';

/**
 * @ngdoc function
 * @name workspaceApp.controller:DataSheet1
 * @description
 * # DataSheet1
 * Controller of the workspaceApp
 */

angular.module('workspaceApp')
  .controller('DataSheet1', ['$scope', '$location', 'preload', 'Alchemy', function ($scope, $location, preload, Alchemy) {
    $scope.ds1 = {
      entries: preload.get(),
      fn: 'custom_func',
      items: ['first', 'second', 'third'],
      selectedValue: 'first',
      data: {
        title: 'DataSheet1 - Flowchart Request',
        start_date:"07-02-2015",
        end_date:"07-19-2015",
        total:16
      }
    };
    
    Alchemy.rune().then(function(data) {
      $scope.tpl_data = Object.assign(data,$scope.ds1.data);
    });
    
    $scope.new_entry = {
      customer: '',
      assembly: '',
      date_received: '',
      time_received: '',
      date_completed: '',
      time_completed: ''
    };
    
  /* // # Alchemy custom methods - Alchemy.fusion(data).method()
    // Method with non-filtered (nf) data
    console.log(Alchemy.fusion($scope.ds1.entries).ls_customer_nf());
    
    // Methods with filter data 1- filter 2- exec method
    var data_filtered = Alchemy.fusion($scope.ds1.entries).filter();
    
    console.log(Alchemy.fusion(data_filtered).ls_customer());
    
  */
    
    $scope.save = function(){
    };
    
    $scope.refresh = function(){
      location.reload("/datasheet1");
    };
    
    $scope.export = function(){
      
    };
    
    $scope.printDiv = function(divName) {
      var printContents = document.getElementById(divName).innerHTML;
      var popupWin = window.open('', '_blank', 'width=300,height=300');
      popupWin.document.open();
      popupWin.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + printContents + '</body></html>');
      popupWin.document.close();
    };
    
    $scope.insert = function(){
      console.log(angular.toJson($scope.new_entry));
      // $scope.ds1.entries = $scope.ds1.entries.concat($scope.new_entry);
      $scope.ds1.entries.$add($scope.new_entry);
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