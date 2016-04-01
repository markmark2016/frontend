'use strict';

angular.module('mark.editProfile')
.controller('EditRelationshipMainCtrl', ['$scope', 'AccountSrv', '$location', function($scope, AccountSrv, $location) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  $scope.relationships = (function(affectiveMap) {
    var arr = [];
    for (var k in affectiveMap) {
      arr.push({
        value: "" + k, 
        title: "" + affectiveMap[k]
      });
    }
    return arr;
  })(AccountSrv.affectiveMap);

  $scope.onRelationshipChange = function(affectiveStatus){
    AccountSrv.updateAccount.action({
      userId: userId
    }, {
      affectiveStatus: affectiveStatus
    }, function() { $location.path('/tab/edit-profile'); },
    function() { $location.path('/tab/edit-profile'); });
  };

}]);
