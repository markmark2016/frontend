'use strict';

angular.module('mark.editProfile')
.controller('EditGenderMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv, $location) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  $scope.genders = [
    {value: '1', title: '男'},
    {value: '2', title: '女'}
  ];

  $scope.onGenderChange = function(gender){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      gender: gender.value
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
