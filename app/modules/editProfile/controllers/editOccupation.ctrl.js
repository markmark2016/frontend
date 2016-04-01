'use strict';

angular.module('mark.editProfile')
.controller('EditOccupationMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv, $location) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
    $scope.infoField = $scope.user.occupation;
  });

  $scope.pageTitle = "职 业";
  $scope.placeholder = "大学老师";


  $scope.onSubmit = function(occupation){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      occupation: occupation
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
