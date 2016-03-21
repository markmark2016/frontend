'use strict';

angular.module('mark.editProfile')
.controller('EditDescriptionMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
    $scope.description = $scope.user.description;
  }

  function fail(err){
    alert(err);
  }

  $scope.onSubmit = function(desc){
    console.log(desc);
    AccountSrv.updateBasicAccount({
      update_field: 'description',
      update_value: desc
    });
  };

}]);
