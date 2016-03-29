angular.module('mark.services')
.factory('GroupsCenterSrv', ['$resource','HostSrv','ApiSrv', function($resource,HostSrv,ApiSrv){
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
    return {
        getGroupsSrv: getGroupsSrv,
        getAssSrv: getAssSrv,
        getGroupDetailSrv: getGroupDetailSrv,
        getAsDetailSrv: getAsDetailSrv,
        getGroupUsersSrv: getGroupUsersSrv
    };
}]);