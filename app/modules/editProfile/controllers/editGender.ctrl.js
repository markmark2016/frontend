'use strict';

angular.module('mark.editProfile')
.controller('EditGenderMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
  }

  function fail(err){
    alert(err);
  }

  $scope.genders = [
    {value: 'male', title: '男'},
    {value: 'female', title: '女'}
  ];

  $scope.onGenderChange = function(gender){
    console.log(gender);
    AccountSrv.updateBasicAccount({
      update_field: 'gender',
      update_value: gender.value
    });
  };

}]);
