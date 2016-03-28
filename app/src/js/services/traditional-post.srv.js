angular.module('mark.services')

.factory('TraditionalPostSrv', ['$resource', function($resource) {
    var x_www_url_encoded = function(url, defaultParams, customActions) {
        var _customActions = {};
        for (var k in customActions) {
            var action = customActions[k];
            _customActions[k] = {
                method: "POST",
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                transformRequest: function (data, headersGetter) {
                    var str = [];
                    for (var d in data)
                        str.push(encodeURIComponent(d) + "=" + encodeURIComponent(data[d]));
                    return str.join("&");
                },
                params: {},
                isArray: false
            };
            for (var n in action) {
                _customActions[k][n] = action[n];
            }
        }
        return $resource(url, defaultParams, _customActions);
    };
    return x_www_url_encoded;
}])