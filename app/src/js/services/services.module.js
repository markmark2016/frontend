angular.module('mark.services', ['LocalStorageModule','ngResource'])
.factory('GroupsCenterSrv', ['$resource','HostSrv','ApiSrv',
  function($resource,HostSrv,ApiSrv){
  	var actionSrv = $resource(HostSrv.main+':api', {}, { //一层请求
		      action: {
				method:'GET', params:{api:"api"}, isArray:false
			  }
		    });
  	var actionByIdSrv = $resource(HostSrv.main+':api/:id', {}, { //二层请求
		      action: {
				method:'GET', params:{api:"api",id:"id"}, isArray:false
			  }
		    });
  	var actionByIdAddSrv = $resource(HostSrv.main+':api/:id/:contype', {}, { //3层请求
		      action: {
				method:'GET', params:{api:"api",id:"id",contype:"contype"}, isArray:false
			  }
		    });
  	return {
  		actionSrv:actionSrv,
  		actionByIdSrv:actionByIdSrv,
  		actionByIdAddSrv:actionByIdAddSrv
  	};
  }]);