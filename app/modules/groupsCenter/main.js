'use strict';

var userId = 6;

angular.module('mark.groupsCenter', ['mark.services', 'mark.dialog']);

angular.module('mark.groupsCenter')
.controller('GroupsCenterMainCtrl', ['$scope', 'ApiSrv', function($scope, ApiSrv) {
	var activeSection = 'groups-list';
	$scope.selectSection = function(section){
	    activeSection = section;
	};

	$scope.isActiveSection = function(section){
	    if(activeSection==section) return true;
	    return false;
	};
}])
.controller('GroupsListCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv',function($scope, ApiSrv,GroupsCenterSrv) {
	$scope.getGroupStatus = function(group) {
		var now = new Date().getTime();
		if (now > group.endDate) return 'end';
		else if (now < group.beginDate) return 'ready';
		else return 'pending';
	};
	GroupsCenterSrv.getGroupsSrv.action({}, function(result){
	 	$scope.data = result.data;
	});
}])
.controller('AssListCtrl', ['$scope', 'ApiSrv' ,'GroupsCenterSrv',function($scope, ApiSrv,GroupsCenterSrv) {
	GroupsCenterSrv.getAssSrv.action({}, function(result){
	 	$scope.data = result.data;
	});
}])
.controller('GroupDetailCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv','alertDialog','$stateParams','$state', function($scope, ApiSrv,GroupsCenterSrv, alertDialog, $stateParams,$state) {
	GroupsCenterSrv.getGroupDetailSrv.action({id:$stateParams.groupId,userId:6},function(result){
	 	$scope.data = result.data;
	});
    GroupsCenterSrv.getGroupUsersSrv.action({id:$stateParams.groupId},function(result){
	 	$scope.data_users = result.data;
	});
	$state.go('tab.group-detail.intr');
	$scope.joinGroup = function() {
		GroupsCenterSrv.joinGroupSrv.action({}, {
			groupIdFk: $stateParams.groupId,
			userIdFk: userId
		}, function(result) {
			$scope.data.userStatus = 1;
		}, function(error) {
			alertDialog($scope, '加入小组失败', "服务器开小差了，请稍等一下");
		});
	};
	$scope.quitGroup = function() {
		GroupsCenterSrv.quitGroupSrv.action({}, {
			groupIdFk: $stateParams.groupId,
			userIdFk: userId
		}, function(result) {
			$scope.data.userStatus = 0;
		}, function(error) {
			alertDialog($scope, '退出小组失败', "服务器开小差了，请稍等一下");
		});
	};
}])
.controller('GroupDetailCommentCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv','RemarkSrv','$stateParams',function($scope, ApiSrv,GroupsCenterSrv,RemarkSrv,$stateParams) {
	$scope.hotlist = [];
	$scope.timeorderlist = [];

	var activeSection = 'hot';
	$scope.activeList = $scope.hotlist;
	$scope.selectSection = function(section){
	    activeSection = section;
	    if (section == 'hot') $scope.activeList = $scope.hotlist;
	    else if (section == 'recent') $scope.activeList = $scope.timeorderlist;
	    else $scope.activeList = [];
	};

	$scope.isActiveSection = function(section){
	    if(activeSection==section) return true;
	    return false;
	};

	RemarkSrv.getGroupRemarksSrv.action({
		groupId: $stateParams.groupId
	}, function(result) {
		$scope.hotlist = result.data.hotlist;
		$scope.timeorderlist = result.data.timeorderlist;
		$scope.selectSection(activeSection);
	});
}])
.controller('AsDetailCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv','$stateParams', function($scope, ApiSrv,GroupsCenterSrv,$stateParams) {
	GroupsCenterSrv.getAsDetailSrv.action({id:$stateParams.asId,userId:6},function(result){
	 	$scope.data = result.data;
	 	$scope.categories = [];
	 	for (var k in result.data.categoryMap) {
	 		$scope.categories.push({
	 			name: k,
	 			list: result.data.categoryMap[k]
	 		});
	 	}
	});
}])
.controller('GroupUserListCtrl', ['$scope','GroupsCenterSrv','$stateParams', function($scope,GroupsCenterSrv,$stateParams) {
	$scope.users = [];
	GroupsCenterSrv.getGroupUsersSrv.action({id:$stateParams.groupId},function(result){
	 	$scope.users = result.data;
	});
}])
;
