'use strict';

angular.module('mark.message', ['mark.services', 'mark.filters']);

angular.module('mark.message')

.controller('MessageCenterCtrl', ['$scope', 'MessageSrv', 'AccountSrv', function($scope, MessageSrv, AccountSrv) {
    var userId = AccountSrv.getUserId();
    $scope.userId = userId;
    $scope.userIdLoaded = true;
    $scope.summary = {
        sys: {
            unread: 0,
            message: ""
        },
        like: {
            unread: 0,
            message: ""
        },
        reply: {
            unread: 0,
            message: ""
        }
    }
    MessageSrv.getSummarySrv.action({userId: userId}, function(result) {
        $scope.summary.sys.unread = result.data.unreadsyscount;
        $scope.summary.like.unread = result.data.unreadlikecount;
        $scope.summary.reply.unread = result.data.unreadreplycount;
    });
    MessageSrv.getSysMsgsSrv.action({userId: userId}, function(result) {
        $scope.summary.sys.unread = result.data.unreadsyscount;
        if (result.data.unreadsyslist.length > 0) $scope.summary.sys.message = result.data.unreadsyslist[0].content;
    });
    MessageSrv.getReplyMsgsSrv.action({userId: userId}, function(result) {
        $scope.summary.reply.unread = result.data.unreadreplycount;
        if (result.data.unreadreplylist.length > 0) $scope.summary.reply.message = result.data.unreadreplylist[0].content;
    });
    MessageSrv.getLikeMsgsSrv.action({userId: userId}, function(result) {
        $scope.summary.like.unread = result.data.unreadlikecount;
        if (result.data.unreadlikelist.length > 0) $scope.summary.like.message = result.data.unreadlikelist[0].content;
    });
}])

.controller('SysMsgListCtrl', ['$scope', 'MessageSrv', 'AccountSrv', function($scope, MessageSrv, AccountSrv) {
    var userId = AccountSrv.getUserId();
    $scope.userId = userId;
    $scope.userIdLoaded = true;
    $scope.viewTitle = "系统消息";
    $scope.messages = [];
    MessageSrv.getSysMsgsSrv.action({userId: userId}, function(result) {
        $scope.messages = result.data.unreadsyslist;
    });
}])

.controller('ReplyMsgListCtrl', ['$scope', 'MessageSrv', 'AccountSrv', function($scope, MessageSrv, AccountSrv) {
    var userId = AccountSrv.getUserId();
    $scope.userId = userId;
    $scope.userIdLoaded = true;
    $scope.viewTitle = "评论";
    $scope.messages = [];
    MessageSrv.getReplyMsgsSrv.action({userId: userId}, function(result) {
        $scope.messages = result.data.unreadreplylist;
    });
}])

.controller('LikeMsgListCtrl', ['$scope', 'MessageSrv', 'AccountSrv', function($scope, MessageSrv, AccountSrv) {
    var userId = AccountSrv.getUserId();
    $scope.userId = userId;
    $scope.userIdLoaded = true;
    $scope.viewTitle = "点赞";
    $scope.messages = [];
    MessageSrv.getLikeMsgsSrv.action({userId: userId}, function(result) {
        $scope.messages = result.data.unreadlikelist;
    });
}])
;