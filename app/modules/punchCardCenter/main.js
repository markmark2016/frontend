'use strict';

var userId = 6;

angular.module('mark.remark', ['mark.services', 'mark.dialog', 'mark.filters']);

angular.module('mark.remark')
.controller('PunchesListCtrl', ['$scope','$location','$state','RemarkSrv',function($scope,$location,$state,RemarkSrv) {
    RemarkSrv.punchesSrv.action({userId: userId},function(result){
        $scope.data = result.data;
    });

    $scope.postPunch = function(groupId) {
        // $state.go('tab.edit-remark', {groupId: groupId});
        $location.path('/tab/edit-remark/' + groupId);
    };
    $scope.showRemarks = function(groupId) {
        // $state.go('tab.edit-remark', {groupId: groupId});
        $location.path('/tab/edit-remark/' + groupId);
    };
    $scope.postRemark = function(groupId) {
        // $state.go('tab.edit-remark', {groupId: groupId});
        $location.path('/tab/edit-remark/' + groupId);
    };
}])
.controller('EditRemarkCtrl', ['$scope', 'RemarkSrv', '$stateParams', '$location', 'alertDialog', function($scope, RemarkSrv, $stateParams, $location, alertDialog) {
    var groupId = $stateParams.groupId;
    $scope.group = {};

    RemarkSrv.punchesSrv.action({userId: userId},function(result){
        for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].groupId == groupId) {
                $scope.group = result.data[i];
                break;
            }
        }
    });

    $('.view-edit-remark').resize(function() {
        var viewHeight = $(this).height();
        if (!viewHeight) return;
        var listHeight = $(this).find('.list').height();
        var contentHeight = $(this).find('.input-content').find('textarea').height();
        contentHeight = contentHeight + viewHeight - listHeight;
        $(this).find('.input-content').find('textarea').css('height', contentHeight + 'px');
    });
    $('.view-edit-remark').resize();

    $scope.createRemark = function() {
        RemarkSrv.createRemarkSrv.action({
            groupId: groupId,
            userId: userId
        }, {
            startPage: $scope.remarkPageStart || "",
            endPage: $scope.remarkPageEnd || "",
            title: $scope.remarkTitle || "",
            comment: $scope.remarkContent || ""
        }, function(result) {
            $location.path('/tab/remark-today/' + groupId);
        }, function(error) {
            alertDialog($scope, '提交失败', "服务器开小差了，请稍等一下");
        });
    };

    $scope.completeRemark = function() {
        RemarkSrv.completeRemarkSrv.action({
            groupId: groupId,
            userId: userId
        }, {
            title: $scope.remarkTitle || "",
            comment: $scope.remarkContent || ""
        }, function(result) {
            $location.path('/tab/remark-today/' + groupId);
        }, function(error) {
            alertDialog($scope, '提交失败', "服务器开小差了，请稍等一下");
        });
    };
}])
.controller('RemarkDetailController', ['$scope', 'RemarkSrv', '$stateParams', 'alertDialog', function($scope, RemarkSrv, $stateParams, alertDialog) {
    var groupId = $stateParams.groupId;
    // var userId = $stateParams.userId || userId;
    var remarkId = $stateParams.remarkId;

    $scope.group = {};
    $scope.remark = {};

    $scope.remarkLiked = false;

    function getRemarkCallback(result) {
        $scope.remark = result.data;
        for (var i = 0; i < $scope.remark.likelist.length; i++) {
            if ($scope.remark.likelist[i].userId == userId) {
                remarkLiked = true;
                break;
            }
        }
        RemarkSrv.punchesSrv.action({userId: userId},function(result){
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].groupId == $scope.remark.remark.groupIdFk) {
                    $scope.group = result.data[i];
                    break;
                }
            }
        });
    };

    var refreshRemark;
    if (remarkId) {
        refreshRemark = function () {
            RemarkSrv.getRemarkDetailSrv.action({
                remarkId: remarkId
            }, getRemarkCallback);
        };
    } else {
        refreshRemark = function () {
            RemarkSrv.getTodayRemarkDetailSrv.action({
                groupId: groupId,
                userId: userId
            }, getRemarkCallback);
        };
    }

    refreshRemark();

    $scope.doReply = function() {
        RemarkSrv.postReplySrv.action({}, {
            remarkId: $scope.remark.remark.id,
            userId: userId,
            content: $scope.remarkReplyContent
        }, function() {
            refreshRemark();
            $scope.toggleReply = false;
            $scope.remarkReplyContent = undefined;
        }, function() {
            alertDialog($scope, '回复失败', "服务器开小差了，请稍等一下");
        });
    };

    $scope.doLike = function() {
        if (!$scope.remarkLiked) {
            RemarkSrv.postLikeSrv.action({}, {
                remarkId: $scope.remark.remark.id,
                userId: userId
            }, function() {
                refreshRemark();
            }, function() {
                alertDialog($scope, '点赞失败', "服务器开小差了，请稍等一下");
            });
        }
    };
}])
;
