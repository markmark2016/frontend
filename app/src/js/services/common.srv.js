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

    var doubanBookSearchUrl = "https://api.douban.com/v2/book/search";
    if (HostSrv.env == 'staging') doubanBookSearchUrl = "/test/json/douban-books.json";
    srv.getDoubanBooks = $resource(doubanBookSearchUrl, {}, {
        action: {
            method: 'GET',
            params: { q: "q" } // q, tag, start, end. Doc see: https://developers.douban.com/wiki/?title=book_v2#get_book_search
        }
    });

    return srv;
}]);