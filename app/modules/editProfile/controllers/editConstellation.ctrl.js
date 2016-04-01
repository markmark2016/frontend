'use strict';

angular.module('mark.editProfile')
.controller('EditConstellationMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv, $location) {


  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  $scope.constellations = [
    {value: '白羊座', title: '白羊座'},
    {value: '金牛座', title: '金牛座'},
    {value: '双子座', title: '双子座'},
    {value: '巨蟹座', title: '巨蟹座'},
    {value: '狮子座', title: '狮子座'},
    {value: '处女座', title: '处女座'},
    {value: '天秤座', title: '天秤座'},
    {value: '天蝎座', title: '天蝎座'},
    {value: '射手座', title: '射手座'},
    {value: '摩羯座', title: '摩羯座'},
    {value: '水瓶座', title: '水瓶座'},
    {value: '双鱼座', title: '双鱼座'},
  ];

  $scope.onConstellationChange = function(constellation){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      constellation: constellation
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
