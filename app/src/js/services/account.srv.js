angular.module('mark.services')

.factory('AccountSrv', ['$resource','HostSrv','ApiSrv', 'TraditionalPostSrv', function($resource,HostSrv,ApiSrv,$tpost) {
    var srv = {};

    var locSearchUserId = window.location.search.match(/userId=(\d+)/);
    if (locSearchUserId) locSearchUserId = parseInt(locSearchUserId[1]);
    if (isNaN(locSearchUserId)) locSearchUserId = null;

    srv.getUserId = function() {
        if (HostSrv.env == 'staging') return 6;
        else return locSearchUserId;
    };

    srv.genderMap = {1: '男', 2: '女'};
    srv.affectiveMap = {0: '单身', 1: '恋爱', 2: '已婚', 3: '保密'};

    srv.getUserInfo = $resource(HostSrv.main + ApiSrv.account.userInfo.url , {}, {
        action: {
            method: ApiSrv.account.userInfo.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.getUserDetail = $resource(HostSrv.main + ApiSrv.account.userDetail.url, {}, {
        action: {
            method: ApiSrv.account.userDetail.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.bookTypeMap = { "like": "1", "want": "2" };

    srv.addBook = $tpost(HostSrv.main + ApiSrv.account.userAddBook.url, {}, {
        action: {
            method: ApiSrv.account.userAddBook.method,
            params: {
                userId: "userId",
                title: "title",
                image: "image",
                type: "type"
            }
        }
    });

    srv.deleteBook = $tpost(HostSrv.main + ApiSrv.account.userDeleteBook.url, {}, {
        action: {
            method: ApiSrv.account.userDeleteBook.method,
            params: {}
        }
    });

    srv.updateAccount = $tpost(HostSrv.main + ApiSrv.account.userUpdate.url, {}, {
        action: {
            method: ApiSrv.account.userUpdate.method,
            params: { userId: "userId" }
        }
    });

    srv.getUserGroups = $resource(HostSrv.main + ApiSrv.account.userGroups.url, {}, {
        action: {
            method: ApiSrv.account.userGroups.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.getUserRank = $resource(HostSrv.main + ApiSrv.account.userRank.url, {}, {
        action: {
            method: ApiSrv.account.userRank.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.getUserRankInGroup = $resource(HostSrv.main + ApiSrv.account.userRankInGroup.url, {}, {
        action: {
            method: ApiSrv.account.userRankInGroup.method,
            params: {
                userId: "userId",
                groupId: "groupId"
            },
            isArray: false
        }
    });

    srv.getUserScore = $resource(HostSrv.main + ApiSrv.account.userScore.url, {}, {
        action: {
            method: ApiSrv.account.userScore.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.getUserReaded = $resource(HostSrv.main + ApiSrv.account.userReaded.url, {}, {
        action: {
            method: ApiSrv.account.userReaded.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.getUserPunches = $resource(HostSrv.main + ApiSrv.account.userPunches.url, {}, {
        action: {
            method: ApiSrv.account.userPunches.method,
            params: {
                userId: "userId"
                // startDate
                // endDate
            },
            isArray: false
        }
    });

    srv.getUserPunchDay = $resource(HostSrv.main + ApiSrv.account.userPunchDetail.url, {}, {
        action: {
            method: ApiSrv.account.userPunchDetail.method,
            params: {
                userId: "userId"
                // date
            },
            isArray: false
        }
    });

    srv.getUserRemarks = $resource(HostSrv.main + ApiSrv.account.userRemarks.url, {}, {
        action: {
            method: ApiSrv.account.userRemarks.method,
            params: { userId: "userId" },
            isArray: false
        }
    });

    srv.getUserRemarksInGroup = $resource(HostSrv.main + ApiSrv.account.userRemarkOfGroup.url, {}, {
        action: {
            method: ApiSrv.account.userRemarkOfGroup.method,
            params: {
                userId: "userId",
                groupId: "groupId"
            },
            isArray: false
        }
    });

    return srv;
}]);