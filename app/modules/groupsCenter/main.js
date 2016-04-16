'use strict';

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
.controller('GroupDetailCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv', 'RemarkSrv', 'WechatSrv', 'alertDialog','confirmDialog','needFocusDialog','$stateParams','$state', 'AccountSrv', '$location', function($scope, ApiSrv,GroupsCenterSrv, RemarkSrv, WechatSrv, alertDialog, confirmDialog, needFocusDialog, $stateParams,$state, AccountSrv, $location) {
	var userId = AccountSrv.getUserId();
	$scope.userId = userId;
	GroupsCenterSrv.getGroupDetailSrv.action({id:$stateParams.groupId,userId:userId},function(result){
	 	$scope.data = result.data;

	 	if (!isNaN(parseInt($scope.data.frequency))) $scope.data.frequency = "每" + $scope.data.frequency + "天一次";

	    AccountSrv.getUserDetail.action({ userId: userId }, function (result){
	        $scope.user = result.data.user;
	        var shareUserName = (($scope.user && $scope.user.nickname) ? $scope.user.nickname : "我");
	        var shareAsName = (($scope.data && $scope.data.groupName) ? $scope.data.groupName : "iMark");
	        var shareDesc = (($scope.data && $scope.data.groupDesc) ? $scope.data.groupDesc : "品味书香，分享时光，一起“悦”读");
	        var shareImg = (($scope.data && $scope.data.groupImage) ? $scope.data.groupImage : null);
	        var shareParams = {
	            title: shareUserName + "邀请你一起加入" + shareAsName,
	            desc: shareDesc,
	            imgUrl: shareImg
	        };
	        WechatSrv.init(function() {
	            WechatSrv.onMenuShareTimeline(shareParams);
	            WechatSrv.onMenuShareAppMessage(shareParams);
	        }, function(err) {
	            console.error("An error occured when initialize wechat JS API", err);
	        });
	    }, function() {
	        var shareUserName = (($scope.user && $scope.user.nickname) ? $scope.user.nickname : "我");
	        var shareAsName = (($scope.data && $scope.data.groupName) ? $scope.data.groupName : "iMark");
	        var shareDesc = (($scope.data && $scope.data.groupDesc) ? $scope.data.groupDesc : "品味书香，分享时光，一起“悦”读");
	        var shareImg = (($scope.data && $scope.data.groupImage) ? $scope.data.groupImage : null);
	        var shareParams = {
	            title: shareUserName + "邀请你一起加入" + shareAsName,
	            desc: shareDesc,
	            imgUrl: shareImg
	        };
	        WechatSrv.init(function() {
	            WechatSrv.onMenuShareTimeline(shareParams);
	            WechatSrv.onMenuShareAppMessage(shareParams);
	        }, function(err) {
	            console.error("An error occured when initialize wechat JS API", err);
	        });
	    });
	});
    GroupsCenterSrv.getGroupUsersSrv.action({id:$stateParams.groupId},function(result){
	 	$scope.data_users = result.data;
	});
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
		confirmDialog($scope, '退出小组', '你确定要退出这个小组吗？', function() {
			GroupsCenterSrv.quitGroupSrv.action({}, {
				groupIdFk: $stateParams.groupId,
				userIdFk: userId
			}, function(result) {
				$scope.data.userStatus = 0;
			}, function(error) {
				alertDialog($scope, '退出小组失败', "服务器开小差了，请稍等一下");
			});
		});
	};
	$scope.joinGroupNeedFocus = function() {
		needFocusDialog();
	};

	var activeSection = $stateParams.section || 'intr';
	$scope.activeList = $scope.hotlist;
	$scope.selectSection = function(section){
		if (activeSection == section) return;
	    // activeSection = section;
	    $location.path('/tab/group/' + $stateParams.groupId + '/' + section);
	    // window.history.pushState({}, '#/tab/group/' + $stateParams.groupId + '/' + section);
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

	$scope.hotlist = [];
	$scope.timeorderlist = [];

	var activeRemarkSection = 'hot';
	$scope.activeList = $scope.hotlist;
	$scope.selectRemarkSection = function(section){
	    activeRemarkSection = section;
	    if (section == 'hot') $scope.activeList = $scope.hotlist;
	    else if (section == 'recent') $scope.activeList = $scope.timeorderlist;
	    else $scope.activeList = [];
	};

	$scope.isActiveRemarkSection = function(section){
	    if(activeRemarkSection==section) return true;
	    return false;
	};

	RemarkSrv.getGroupRemarksSrv.action({
		groupId: $stateParams.groupId
	}, function(result) {
		$scope.hotlist = result.data.hotlist;
		$scope.timeorderlist = result.data.timeorderlist;
		$scope.selectRemarkSection(activeRemarkSection);
	});
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
.controller('AsDetailCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv','WechatSrv','$stateParams', 'AccountSrv', function($scope, ApiSrv,GroupsCenterSrv,WechatSrv,$stateParams,AccountSrv) {
	var userId = AccountSrv.getUserId();
	$scope.userId = userId;
	$scope.user = {};
	$scope.getGroupStatus = function(group) {
		var now = new Date().getTime();
		if (now > group.endDate) return 'end';
		else if (now < group.beginDate) return 'ready';
		else return 'pending';
	};
	GroupsCenterSrv.getAsDetailSrv.action({id:$stateParams.asId,userId:userId},function(result){
	 	$scope.data = result.data;
	 	$scope.categories = [];
	 	for (var k in result.data.categoryMap) {
	 		$scope.categories.push({
	 			name: k,
	 			list: result.data.categoryMap[k]
	 		});
	 	}

	    AccountSrv.getUserDetail.action({ userId: userId }, function (result){
	        $scope.user = result.data.user;
	        var shareUserName = (($scope.user && $scope.user.nickname) ? $scope.user.nickname : "我");
	        var shareAsName = (($scope.data && $scope.data.associationName) ? $scope.data.associationName : "iMark");
	        var shareDesc = (($scope.data && $scope.data.associationDesc) ? $scope.data.associationDesc : "品味书香，分享时光，一起“悦”读");
	        var shareImg = (($scope.data && $scope.data.image) ? $scope.data.image : null);
	        var shareParams = {
	            title: shareUserName + "邀请你一起加入" + shareAsName,
	            desc: shareDesc,
	            imgUrl: shareImg
	        };
	        WechatSrv.init(function() {
	            WechatSrv.onMenuShareTimeline(shareParams);
	            WechatSrv.onMenuShareAppMessage(shareParams);
	        }, function(err) {
	            console.error("An error occured when initialize wechat JS API", err);
	        });
	    }, function (){
	        var shareUserName = (($scope.user && $scope.user.nickname) ? $scope.user.nickname : "我");
	        var shareAsName = (($scope.data && $scope.data.associationName) ? $scope.data.associationName : "iMark");
	        var shareDesc = (($scope.data && $scope.data.associationDesc) ? $scope.data.associationDesc : "品味书香，分享时光，一起“悦”读");
	        var shareImg = (($scope.data && $scope.data.image) ? $scope.data.image : null);
	        var shareParams = {
	            title: shareUserName + "邀请你一起加入" + shareAsName,
	            desc: shareDesc,
	            imgUrl: shareImg
	        };
	        WechatSrv.init(function() {
	            WechatSrv.onMenuShareTimeline(shareParams);
	            WechatSrv.onMenuShareAppMessage(shareParams);
	        }, function(err) {
	            console.error("An error occured when initialize wechat JS API", err);
	        });
	    });
	});
}])
.controller('GroupUserListCtrl', ['$scope','GroupsCenterSrv','$stateParams', function($scope,GroupsCenterSrv,$stateParams) {
	$scope.users = [];
	GroupsCenterSrv.getGroupUsersSrv.action({id:$stateParams.groupId},function(result){
	 	$scope.users = result.data;
	});
}])
.controller('GroupApplyCtrl', ['$scope','GroupsCenterSrv','$stateParams','alertDialog','$location','AccountSrv', function($scope,GroupsCenterSrv,$stateParams,alertDialog,$location,AccountSrv) {
	$scope.form = {};
	$scope.userId = AccountSrv.getUserId();
	$scope.userIdLoaded = true;
	$scope.applyGroup = function() {
		GroupsCenterSrv.applyGroupSrv.action({}, {
			userIdFk: $scope.userId,
			groupName: $scope.form.groupName || "",
			bookName: $scope.form.bookName || "",
			readSlogan: $scope.form.readSlogan || "",
			groupDesc: $scope.form.groupDesc || "",
			captainName: $scope.form.captainName || "",
			captainBrief: $scope.form.captainBrief || "",
			captainEmail: $scope.form.captainEmail || "",
			captainWecode: $scope.form.captainWecode || "",
			captainPhone: $scope.form.captainPhone || ""
		}, function() {
			alertDialog($scope, '申请成功', "管理员会尽快受理", function() {
				$location.path('/tab/groups-center');
			});
		}, function(error) {
			alertDialog($scope, '申请小组失败', "服务器开小差了，请稍等一下");
		});
	};
}])
;
