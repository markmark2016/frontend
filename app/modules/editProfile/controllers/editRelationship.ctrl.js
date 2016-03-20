'use strict';

angular.module('mark.editProfile')
.controller('EditRelationshipMainCtrl', ['$scope', 'AccountSrv', 'RelationshipSrv', function($scope, AccountSrv, RelationshipSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
  }

  function fail(err){
    alert(err);
  }

  $scope.relationships = RelationshipSrv.getRelationships();

  $scope.onRelationshipChange = function(r){
    console.log(r);
    AccountSrv.updateBasicAccount({
      update_field: 'relationship',
      update_value: r.value
    });
  };

}]);
