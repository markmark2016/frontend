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
;
