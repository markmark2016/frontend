angular.module('mark.services')
.factory('GroupsCenterSrv', ['$resource','HostSrv','ApiSrv', 'TraditionalPostSrv', function($resource,HostSrv,ApiSrv,$tpost){
    var getGroupsSrv = $resource(HostSrv.main + ApiSrv.groupsCenter.get_groups.url , {}, { //一层请求
        action: {
            method:'GET', params:{}, isArray:false
        }
    });
    var getAssSrv = $resource(HostSrv.main + ApiSrv.groupsCenter.get_ass.url , {}, { //一层请求
        action: {
            method:'GET', params:{}, isArray:false
        }
    });
    var getGroupDetailSrv = $resource(HostSrv.main + ApiSrv.groupsCenter.get_group_detail.url, {}, { //二层请求
        action: {
            method:'GET', params:{id:"id"}, isArray:false
        }
    });
    var getAsDetailSrv = $resource(HostSrv.main + ApiSrv.groupsCenter.get_as_detail.url, {}, { //二层请求
        action: {
            method:'GET', params:{id:"id"}, isArray:false
        }
    });
    var getGroupUsersSrv = $resource(HostSrv.main + ApiSrv.groupsCenter.get_group_users.url, {}, { //3层请求
        action: {
            method:'GET', params:{id:"id"}, isArray:false
        }
    });
    var joinGroupSrv = $tpost(HostSrv.main + ApiSrv.groupsCenter.post_join_group.url, {}, {
        action: {
            method: ApiSrv.groupsCenter.post_join_group.method,
            params: { }
        }
    });
    var quitGroupSrv = $tpost(HostSrv.main + ApiSrv.groupsCenter.post_quit_group.url, {}, {
        action: {
            method: ApiSrv.groupsCenter.post_quit_group.method,
            params: { }
        }
    });
    var applyGroupSrv = $tpost(HostSrv.main + ApiSrv.groupsCenter.post_apply_group.url, {}, {
        action: {
            method: ApiSrv.groupsCenter.post_apply_group.method,
            params: { }
        }
    });
    return {
        getGroupsSrv: getGroupsSrv,
        getAssSrv: getAssSrv,
        getGroupDetailSrv: getGroupDetailSrv,
        getAsDetailSrv: getAsDetailSrv,
        getGroupUsersSrv: getGroupUsersSrv,
        joinGroupSrv: joinGroupSrv,
        quitGroupSrv: quitGroupSrv,
        applyGroupSrv: applyGroupSrv
    };
}]);