'use strict';

angular.module('mark.editProfile')
.controller('EditInterestsMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv,$location) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
    $scope.infoField = $scope.user.interests;
  });

  $scope.pageTitle = "兴趣领域";
  $scope.placeholder = "经济，艺术，哲学...？";

  $scope.onSubmit = function(infoField){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      interests: infoField
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
