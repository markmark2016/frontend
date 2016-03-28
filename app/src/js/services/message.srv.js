angular.module('mark.services')
.factory('MessageSrv', ['$resource','HostSrv','ApiSrv', 'TraditionalPostSrv', function($resource,HostSrv,ApiSrv,$tpost) {
    var getSummarySrv = $resource(HostSrv.main + ApiSrv.message.get_summary.url, {}, {
        action: {
            method: ApiSrv.message.get_summary.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    var getSysMsgsSrv = $resource(HostSrv.main + ApiSrv.message.get_sys_list.url, {}, {
        action: {
            method: ApiSrv.message.get_sys_list.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    var getLikeMsgsSrv = $resource(HostSrv.main + ApiSrv.message.get_like_list.url, {}, {
        action: {
            method: ApiSrv.message.get_like_list.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    var getReplyMsgsSrv = $resource(HostSrv.main + ApiSrv.message.get_reply_list.url, {}, {
        action: {
            method: ApiSrv.message.get_reply_list.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    return {
        getSummarySrv: getSummarySrv,
        getSysMsgsSrv: getSysMsgsSrv,
        getLikeMsgsSrv: getLikeMsgsSrv,
        getReplyMsgsSrv: getReplyMsgsSrv
    };
}]);