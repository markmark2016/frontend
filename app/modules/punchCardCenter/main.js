'use strict';

angular.module('mark.punchCard', ['mark.services']);

angular.module('mark.punchCard')
.controller('PunchesListCtrl', ['$scope','PunchCardSvr',function($scope,PunchCardSvr) {
    var userId = 6;
    PunchCardSvr.punchesSrv.action({userId: userId},function(result){
        $scope.data = result.data;
    });
}])
;
