'use strict';

angular.module('mark.editProfile')
.controller('EditOccupationMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
    $scope.infoField = $scope.user.occupation;
  }

  function fail(err){
    alert(err);
  }

  $scope.pageTitle = "职 业";
  $scope.placeholder = "大学老师";


  $scope.onSubmit = function(infoField){
    console.log(infoField);
    AccountSrv.updateBasicAccount({
      update_field: 'occupation',
      update_value: infoField
    });
  };

}]);
