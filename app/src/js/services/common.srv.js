angular.module('mark.services')
.factory('CommonSrv', ['$resource','HostSrv','ApiSrv','TraditionalPostSrv', function($resource,HostSrv,ApiSrv,$tpost) {
    var srv = {};

    srv.isFileApiSupported = function() {
        if (File && FileList && FileReader && FormData) return true;
        else return false;
    };

    srv.upload = function(fileObj, success, failed, completed) {
        if (!srv.isFileApiSupported()) {
            throw "Browser does not support File API";
        }
        var formdata = new FormData();
        formdata.append('pictureUrl', fileObj)
        $.ajax({
            url: HostSrv.main + ApiSrv.common.upload.url,
            type: ApiSrv.common.upload.method,
            data: formdata,
            processData: false,
            contentType : false
        })
        .done(function(data) {
            success && success(data);
        })
        .fail(function(error) {
            failed && failed(error);
        })
        .always(function() {
            completed && completed();
        });
    };

    return srv;
}]);