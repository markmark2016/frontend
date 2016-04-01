'use strict';

angular.module('mark.editProfile')
.controller('EditRegionMainCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  var regionsByCity = {
    'Beijing': [
      {value: 'Beijing,Haidian', title: '海淀'},
      {value: 'Beijing,Chaoyang', title: '朝阳'}
    ],
    'Tianjin': [
      {value: 'Tianjin,Nankai', title: '南开'},
      {value: 'Tianjin,Peace', title: '和平'}
    ]
  }

  $scope.regions = regionsByCity[$stateParams.regionCity];

  $scope.onRegionChange = function(region){
    console.log(region);
    AccountSrv.updateBasicAccount({
      update_field: 'region',
      update_value: region.value
    });
  };

}]);
