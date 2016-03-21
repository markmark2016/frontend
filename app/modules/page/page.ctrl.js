'use strict';

angular.module('mark.userCenter')
.controller('PageMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
    $scope.infoField = $scope.user.interests;
  }

  function fail(err){
    alert(err);
  }

  var activeSection = 'myGroups';
  $scope.selectSection = function(section){
    switch(section){
      case 'myGroups':
        activeSection = 'myGroups';
        break;
      case 'profile':
        activeSection = 'profile';
        break;
      case 'more':
        activeSection = 'more';
        break;
    }
  };

  $scope.isActiveSection = function(section){
    if(activeSection==section) return true;
    return false;
  };
}]);
