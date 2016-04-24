angular.module('mark.services')

.factory('HostSrv', [function() {
  var env = 'production';
  // var env = 'staging';
  var wechat_debug = false;
  // var wechat_debug = true;
  var productionHost = {
    env: 'production',
    wechat_debug: wechat_debug,
    main: 'http://sub.markeveryday.com/mark-backend/'
  };
  var stagingHost = {
    env: 'staging',
    wechat_debug: wechat_debug,
    main: '../test/json/'
  };
  if(env=='staging'){
    return stagingHost;
  }else{
    return productionHost;
  }
}]);
