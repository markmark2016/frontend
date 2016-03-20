'use strict';

angular.module('mark.editProfile')
.controller('EditInterestsMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
    $scope.infoField = $scope.user.interests;
  }

  function fail(err){
    alert(err);
  }

  $scope.pageTitle = "兴趣领域";
  $scope.placeholder = "经济，艺术，哲学...？";


  $scope.onSubmit = function(infoField){
    console.log(infoField);
    AccountSrv.updateBasicAccount({
      update_field: 'interests',
      update_value: infoField
    });
  };

}]);
