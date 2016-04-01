'use strict';

angular.module('mark.editProfile')
.controller('EditDescriptionMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv, $location) {
  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
    $scope.intro = $scope.user.intro;
  });

  $scope.onSubmit = function(intro){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      intro: intro
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
