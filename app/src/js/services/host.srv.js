angular.module('mark.services')

.factory('HostSrv', [function() {
  //var env = 'production';
  var env = 'staging';
  var productionHost = {
    main: 'http://markmark.sinaapp.com'
  };
  var stagingHost = {
    main: 'http://localhost/markmark'
  };
  if(env=='staging'){
    return stagingHost;
  }else{
    return productionHost;
  }
}]);
