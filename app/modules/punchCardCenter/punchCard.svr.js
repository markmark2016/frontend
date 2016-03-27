angular.module('mark.punchCard')

.factory('PunchCardSvr', ['$resource','HostSrv','ApiSrv', function($resource,HostSrv,ApiSrv) {
    var punchesSrv = $resource(HostSrv.main + ApiSrv.remark.get_punch.url + '/:userId', {}, {
        action: {
            method: "GET",
            params: { userId: "userId" },
            isArray: false
        }
    });

    return {
        punchesSrv: punchesSrv
    };
}]);