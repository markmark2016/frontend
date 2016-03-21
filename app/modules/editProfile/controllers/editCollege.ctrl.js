'use strict';

angular.module('mark.editProfile')
.controller('EditCollegeMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
    $scope.infoField = $scope.user.college;
  }

  function fail(err){
    alert(err);
  }

  $scope.pageTitle = "学 校";
  $scope.placeholder = "中国传媒大学";


  $scope.onSubmit = function(infoField){
    console.log(infoField);
    AccountSrv.updateBasicAccount({
      update_field: 'college',
      update_value: infoField
    });
  };

}]);
