'use strict';

angular.module('mark.editProfile')
.controller('SelectRegionCityMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  $scope.regionCities = [
    {value: 'Beijing', title: '北京'},
    {value: 'Tianjin', title: '天津'}
  ];

}]);
