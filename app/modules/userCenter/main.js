'use strict';

angular.module('mark.user', ['mark.services', 'mark.dialog'])
.controller('UserCenterMainCtrl', ['$scope','AccountSrv',function($scope,AccountSrv) {
    var userId = AccountSrv.getUserId();
    AccountSrv.getUserInfo.action({ userId: userId }, function (result) {
        $scope.user = result.data;
    });
}])
.controller('UserDetailCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    $scope.affectiveStatusMap = AccountSrv.affectiveMap;

    AccountSrv.getUserDetail.action({ userId: $stateParams.userId }, function (result){
        $scope.user = result.data.user;
        $scope.bookList = result.data.bookList;
    });

    var activeSection = 'profile';
    $scope.selectSection = function(section){
        switch(section){
            case 'profile':
                activeSection = 'profile';
                break;
            case 'more':
                activeSection = 'more';
                break;
        }
    };

    $scope.isActiveSection = function(section){
        if(activeSection==section) return true;
        return false;
    };

    $scope.onProfileItemClicked = function($event) {
        $($event.target).find('.profile-value').trigger('click');
    }
}])
.controller('UserGroupsCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserGroups.action({ userId: userId }, function(result) {
        $scope.groups = result.data.groupList;
        $scope.associations = result.data.associationList;
    });
}])
.controller('UserRankCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserRank.action({ userId: userId }, function(result) {
        $scope.totalRank = result.data.totalranklist;
        $scope.groupRanks = result.data.groupranklist;
        for (var i = 0; i < $scope.totalRank.length; i++) {
            if ($scope.totalRank[i].id == userId) {
                $scope.myRank = $scope.totalRank[i];
                break;
            }
        }
        for (var i = 0; i < $scope.groupRanks.length; i++) {
            if ($scope.groupRanks[i].groupRank) {
                var groupRankSplit = $scope.groupRanks[i].groupRank.split('/');
                $scope.groupRanks[i].rankMe = parseInt(groupRankSplit[0]);
                $scope.groupRanks[i].rankTotal = parseInt(groupRankSplit[1]);
            }
        }
    });

    var activeSection = 'total';
    $scope.selectSection = function(section){
        switch(section){
            case 'total':
                activeSection = 'total';
                break;
            case 'group':
                activeSection = 'group';
                break;
        }
    };
    $scope.isActiveSection = function(section){
        if(activeSection==section) return true;
        return false;
    };
}])
.controller('UserRankInGroupCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    var groupId = $stateParams.groupId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserRankInGroup.action({
        userId: userId,
        groupId: groupId
    }, function(result) {
        $scope.rank = result.data.userlist;
        $scope.group = result.data.groupinfo;
        for (var i = 0; i < $scope.rank.length; i++) {
            if ($scope.rank[i].id == userId) {
                $scope.myRank = $scope.rank[i];
                break;
            }
        }
    });
}])
.controller('UserScoreCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserScore.action({ userId: userId }, function(result) {
        $scope.data = result.data;
    });
}])
.controller('UserReadCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserReaded.action({ userId: userId }, function(result) {
        $scope.data = result.data;
    });
}])
.controller('UserPunchCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });

    var now = new Date();
    var startOfThisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    $scope.currentDate = {
        year: startOfThisMonth.getFullYear(),
        month: startOfThisMonth.getMonth() + 1,
        date: startOfThisMonth.getDate(),
        day: startOfThisMonth.getDay()
    };

    $scope.increaseMonth = function() {
        updateDate({
            year: $scope.currentDate.year,
            month: $scope.currentDate.month + 1,
            date: $scope.currentDate.date,
            day: $scope.currentDate.day
        });
    };
    $scope.decreaseMonth = function() {
        updateDate({
            year: $scope.currentDate.year,
            month: $scope.currentDate.month - 1,
            date: $scope.currentDate.date,
            day: $scope.currentDate.day
        });
    };
    
    getPunches();

    function updateDate(currentDate) {
        var date = new Date(currentDate.year, currentDate.month - 1, currentDate.date);
        $scope.currentDate.year = date.getFullYear();
        $scope.currentDate.month = date.getMonth() + 1;
        $scope.currentDate.date = date.getDate();
        $scope.currentDate.day = date.getDay();
        getPunches();
    }

    function getPunches() {
        $scope.days = [];
        $scope.startWeekday = new Date($scope.currentDate.year, $scope.currentDate.month - 1, 1).getDay();
        if ($scope.startWeekday == 0) $scope.startWeekday = 7;
        $scope.blankDays = [];
        for (var i = 1; i < $scope.startWeekday; i++) {
            $scope.blankDays.push(i);
        }
        var currentDateObj = new Date($scope.currentDate.year, $scope.currentDate.month - 1, $scope.currentDate.date);
        var now = new Date();
        for (var i = 0; i < getDaysOfMonth(currentDateObj); i++) {
            $scope.days.push({
                day: i + 1,
                timestamp: new Date($scope.currentDate.year, $scope.currentDate.month - 1, i + 1).getTime(),
                isToday: (now.getFullYear() == currentDateObj.getFullYear() && now.getMonth() == currentDateObj.getMonth() && now.getDate() == (i + 1)),
                isPunched: false
            });
        }

        var startOfThisMonth = new Date($scope.currentDate.year, $scope.currentDate.month - 1, 1);
        var startOfNextMonth = new Date($scope.currentDate.year, $scope.currentDate.month, 1);
        AccountSrv.getUserPunches.action({
            userId: userId,
            startDate: startOfThisMonth.getTime(),
            endDate: startOfNextMonth.getTime() - 1
        }, getPunchesCallback);
    }

    function getPunchesCallback(result) {
        $scope.data = result.data;
        for (var i = 0; i < result.data.datearray.length; i++) {
            var date = new Date(result.data.datearray[i]);
            if ((date.getFullYear() == $scope.currentDate.year) && (date.getMonth() == $scope.currentDate.month - 1) && $scope.days[date.getDate() - 1]) {
                $scope.days[date.getDate() - 1].isPunched = true;
            }
        }
    }

    function getDaysOfMonth(monthDate) {
        var year = monthDate.getFullYear();
        var month = monthDate.getMonth();
        var date = 1;
        var i = 0;
        while ((new Date(year, month, date).getFullYear() == year) && (new Date(year, month, date).getMonth() == month)) {
            date += 1;
            i += 1;
        }
        return i;
    }
}])
.controller('UserPunchDayCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    var timestamp = parseInt($stateParams.day);
    if (isNaN(timestamp)) timestamp = 0;
    $scope.timestamp = timestamp;

    $scope.date = new Date(timestamp);

    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserPunchDay.action({
        userId: userId,
        date: timestamp
    }, function(result) {
        $scope.data = result.data;
    });
}])
.controller('UserRemarkCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserRemarks.action({ userId: userId }, function(result) {
        $scope.data = result.data;
    });
}])
.controller('UserRemarkDayCtrl', ['$scope', '$stateParams', 'AccountSrv', function($scope, $stateParams, AccountSrv) {
    var userId = $stateParams.userId;
    AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
        $scope.user = result.data.user;
    });
    AccountSrv.getUserRemarksInGroup.action({ userId: userId }, function(result) {
        $scope.data = result.data;
    });
}])
;
