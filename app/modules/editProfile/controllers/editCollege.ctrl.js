'use strict';

angular.module('mark.editProfile')
.controller('EditCollegeMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv, $location) {
  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
    $scope.infoField = $scope.user.school;
  });

  $scope.pageTitle = "学 校";
  $scope.placeholder = "中国传媒大学";


  $scope.onSubmit = function(school){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      school: school
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
