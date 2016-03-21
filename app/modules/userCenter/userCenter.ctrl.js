'use strict';

angular.module('mark.userCenter')
.controller('UserCenterMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  $scope.user = {};
  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    console.log('account:',account);
    $scope.user = account;
    $scope.user.statistics = {
      groupCount: 5,
      rank: 2,
      credits: 59
    };
  }

  function fail(err){
    alert(err);
  }

  $scope.collections = {
    continuousReviewBooks: {
      count: 20,
    },
    readBooks: {
      count: 15,
    },
    bookReviews: {
      count: 42,
    },
    timeline: {
    },
    medals: {
    },
    impression: {
    }
  };
}]);
