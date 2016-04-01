angular.module('mark.services')
.factory('RemarkSrv', ['$resource','HostSrv','ApiSrv', 'TraditionalPostSrv', function($resource,HostSrv,ApiSrv,$tpost) {
    var punchesSrv = $resource(HostSrv.main + ApiSrv.remark.get_punch.url, {}, {
        action: {
            method: ApiSrv.remark.get_punch.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    var createRemarkSrv = $tpost(HostSrv.main + ApiSrv.remark.post_create.url, {}, {
        action: {
            method: ApiSrv.remark.post_create.method,
            params: {
                groupId: "groupId",
                userId: "userId"
            }
        }
    });

    var completeRemarkSrv = $tpost(HostSrv.main + ApiSrv.remark.post_complete.url, {}, {
        action: {
            method: ApiSrv.remark.post_complete.method,
            params: {
                groupId: "groupId",
                userId: "userId"
            }
        }
    });

    var updateRemarkSrv = $tpost(HostSrv.main + ApiSrv.remark.post_update.url, {}, {
        action: {
            method: ApiSrv.remark.post_update.method,
            params: {}
        }
    });

    var getTodayRemarkDetailSrv = $resource(HostSrv.main + ApiSrv.remark.get_today.url, {}, {
        action: {
            method: ApiSrv.remark.get_today.method,
            params: {
                groupId: "groupId",
                userId: "userId"
            },
            isArray: false
        }
    });

    var getRemarkDetailSrv = $resource(HostSrv.main + ApiSrv.remark.get_remark.url, {}, {
        action: {
            method: ApiSrv.remark.get_remark.method,
            params: {
                remarkId: "remarkId"
            },
            isArray: false
        }
    });

    var postReplySrv = $tpost(HostSrv.main + ApiSrv.remark.post_reply.url, {}, {
        action: {
            method: ApiSrv.remark.post_reply.method,
            params: {}
        }
    });

    var postLikeSrv = $tpost(HostSrv.main + ApiSrv.remark.post_like.url, {}, {
        action: {
            method: ApiSrv.remark.post_like.method,
            params: {}
        }
    });

    var getGroupRemarksSrv = $resource(HostSrv.main + ApiSrv.remark.get_group.url, {}, {
        action: {
            method: ApiSrv.remark.get_group.method,
            params: { groupId: "groupId" },
            isArray: false
        }
    });

    // var groupSrv = $resource(HostSrv.main + ApiSrv.)

    return {
        punchesSrv: punchesSrv,
        createRemarkSrv: createRemarkSrv,
        completeRemarkSrv: completeRemarkSrv,
        updateRemarkSrv: updateRemarkSrv,
        getTodayRemarkDetailSrv: getTodayRemarkDetailSrv,
        getRemarkDetailSrv: getRemarkDetailSrv,
        postReplySrv: postReplySrv,
        postLikeSrv: postLikeSrv,
        getGroupRemarksSrv: getGroupRemarksSrv
    };
}]);