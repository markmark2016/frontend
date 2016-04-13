
angular.module('mark.services')
.factory('WechatSrv', ['$resource','HostSrv','ApiSrv','TraditionalPostSrv', function($resource,HostSrv,ApiSrv,$tpost) {
    var srv = {};
    var isInitialized = false;

    srv.jsapi_params = {
        debug: HostSrv.wechat_debug,
        jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
    }

    srv.getWechatJSAPIParams = $resource(HostSrv.main + ApiSrv.common.wechat_jsapi.url , {}, {
        action: {
            method: ApiSrv.account.userInfo.method,
            params: { url: "url" },
            isArray: false
        }
    });

    srv.init = function(success, failed) {
        if (isInitialized) {
            success();
            return;
        }
        srv.getWechatJSAPIParams.action({ url: window.location.href.replace(/\#.*$/g, '') }, function(result) {
            $.extend(srv.jsapi_params, {
                appId: result.appId,
                nonceStr: result.nonceStr,
                signature: result.signature,
                timestamp: result.timestamp,
            });
            wx.ready(success);
            wx.error(failed);
            wx.config(srv.jsapi_params);
            isInitialized = true;
        }, failed);
    };

    srv.getOAuthUrl = function(path) {
        return "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxdac023cef2cea008&redirect_uri=http%3a%2f%2fwww.swanhi.com%2fmark-backend%2fwechat%2fauthorize&response_type=code&scope=snsapi_base&state=" + escape(path) + "#wechat_redirect";
    };

    srv.onMenuShareTimeline = function(params) {
        var site_root = window.location.href.replace(/\?.*$/g, '').replace(/\#.*$/g, '').replace(/\/[^\/]*\.[^\/]*$/g, '').replace(/\/$/g, '');
        var defaultImg = site_root + '/img/logo_round.jpg';
        var defaultDesc = "品味书香，分享时光，一起“悦”读";
        params = $.extend({}, {
            title: '发现 - iMark', // 分享标题
            desc: defaultDesc, // 分享描述
            // link: window.location.href.replace(/\?[^\#]*/g, ''), // 分享链接
            link: srv.getOAuthUrl(window.location.hash.replace('#', '') || '/tab/groups-center'),
            imgUrl: defaultImg, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                console.info('[cosmo] share success');
            },
            cancel: function () {
                console.info('[cosmo] share canceled');
            }
        }, params);
        if (!params.imgUrl) params.imgUrl = defaultImg;
        console.info("[cosmo] share on timeline params:", params);
        wx.onMenuShareTimeline(params);
    };

    srv.onMenuShareAppMessage = function(params) {
        var site_root = window.location.href.replace(/\?.*$/g, '').replace(/\#.*$/g, '').replace(/\/[^\/]*\.[^\/]*$/g, '').replace(/\/$/g, '');
        var defaultImg = site_root + '/img/logo_round.jpg';
        var defaultDesc = "品味书香，分享时光，一起“悦”读";
        params = $.extend({}, {
            title: '发现 - iMark', // 分享标题
            desc: defaultDesc, // 分享描述
            // link: window.location.href.replace(/\?[^\#]*/g, ''), // 分享链接
            link: srv.getOAuthUrl(window.location.hash.replace('#', '') || '/tab/groups-center'),
            imgUrl: defaultImg, // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
                console.info('[cosmo] share success');
            },
            cancel: function () {
                console.info('[cosmo] share canceled');
            }
        }, params);
        if (!params.imgUrl) params.imgUrl = defaultImg;
        console.info("[cosmo] share on app params:", params);
        wx.onMenuShareAppMessage(params);
    };

    return srv;
}]);