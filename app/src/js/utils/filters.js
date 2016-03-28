angular.module('mark.filters', []);
angular.module('mark.filters')
.filter('comment', [function() {
    return function(input) {
        if (typeof input === "string") {
            return input.replace(/\n/g, '<br/>');
        } else {
            return "";
        }
    };
}])
.filter('recentDate', ['dateFilter', function(dateFilter) {
    var PERIOD_DAY = 24 * 60 * 60 * 1000;
    var PERIOD_WEEK = PERIOD_DAY * 7;
    return function(input, format) {
        format = format || 'y-MM-d';
        var date = new Date(input);
        var now = new Date();
        var today = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
        timeFromToday = date - today;
        timeFromTodayAbs = Math.abs(timeFromToday);
        timePostFix = (timeFromToday > 0) ? "后" : "前";
        var str = dateFilter(date, format);
        if (date.getUTCFullYear() == now.getUTCFullYear() && date.getUTCMonth() == now.getUTCMonth() && date.getUTCDate() == now.getUTCDate()) {
            str = "今天";
        } else if (timeFromTodayAbs < PERIOD_DAY) {
            str = (timeFromToday > 0) ? "明天" : "昨天";
        } else if (timeFromTodayAbs < 2 * PERIOD_DAY) {
            str = (timeFromToday > 0) ? "后天" : "前天";
        } else if (timeFromTodayAbs < PERIOD_WEEK) {
            str = parseInt(timeFromTodayAbs / PERIOD_DAY) + "天" + timePostFix;
        } else if (timeFromTodayAbs < 2 * PERIOD_WEEK) {
            str = (timeFromToday > 0) ? "下周" : "上周";
        } else if (timeFromTodayAbs < 4 * PERIOD_WEEK) {
            str = parseInt(timeFromTodayAbs / PERIOD_WEEK) + "周" + timePostFix;
        }
        return str;
    }
}])
;
