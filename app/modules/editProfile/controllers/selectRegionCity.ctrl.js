'use strict';

angular.module('mark.editProfile')
.controller('SelectRegionCityMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
  }

  function fail(err){
    alert(err);
  }

  $scope.regionCities = [
    {value: 'Beijing', title: '北京'},
    {value: 'Tianjin', title: '天津'}
  ];

}]);
