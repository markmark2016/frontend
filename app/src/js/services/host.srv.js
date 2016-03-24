angular.module('mark.services')

.factory('HostSrv', [function() {
  var env = 'production';
  //var env = 'staging';
  var productionHost = {
    main: 'http://101.200.158.160/mark-backend/'
  };
  var stagingHost = {
    main: '../test/json/'
  };
  if(env=='staging'){
    return stagingHost;
  }else{
    return productionHost;
  }
}]);
