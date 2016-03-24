'use strict';

angular.module('mark.groupsCenter', ['mark.services']);

angular.module('mark.groupsCenter')
.controller('GroupsCenterMainCtrl', ['$scope', 'ApiSrv', function($scope, ApiSrv) {
	var activeSection = 'groups-list';
	  $scope.selectSection = function(section){
	    activeSection = section;
	  };

	  $scope.isActiveSection = function(section){
	    if(activeSection==section) return true;
	    return false;
	  };
}])
.controller('GroupsListCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv',function($scope, ApiSrv,GroupsCenterSrv) {
	var api_url = ApiSrv.groupsCenter.get_groups.url;
	var api_url = ApiSrv.groupsCenter.get_groups.testUrl;
	GroupsCenterSrv.actionSrv.action({api:api_url},function(result){
	 	$scope.data = result.data;
	 });

}])
.controller('AssListCtrl', ['$scope', 'ApiSrv' ,'GroupsCenterSrv',function($scope, ApiSrv,GroupsCenterSrv) {
	var api_url = ApiSrv.groupsCenter.get_ass.url;
	var api_url = ApiSrv.groupsCenter.get_ass.testUrl;
	GroupsCenterSrv.actionSrv.action({api:api_url},function(result){
	 	$scope.data = result.data;
	 });
}])
.controller('GroupDetailCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv','$stateParams',function($scope, ApiSrv,GroupsCenterSrv,$stateParams) {
	var api_url = ApiSrv.groupsCenter.get_group_detail.url;
	GroupsCenterSrv.actionByIdSrv.action({api:api_url,id:$stateParams.groupId,userId:6},function(result){
	 	$scope.data = result.data;
	 });
   var api_url_users = ApiSrv.groupsCenter.get_group_users.url;
   GroupsCenterSrv.actionByIdAddSrv.action({api:api_url,id:$stateParams.groupId,contype:"users"},function(result){
	 	$scope.data = result.data;
	 });
	

	// var api_url = ApiSrv.groupsCenter.get_group_detail.testUrl;
	// GroupsCenterSrv.actionSrv.action({api:api_url},function(result){
	//  	$scope.data = result.data;
	//  });
	// var api_url_users = ApiSrv.groupsCenter.get_group_users.testUrl;
 //    GroupsCenterSrv.actionSrv.action({api:api_url_users},function(result){
	//  	$scope.users = result.data;
	//  });
	
}])
.controller('AsDetailCtrl', ['$scope', 'ApiSrv','GroupsCenterSrv','$stateParams', function($scope, ApiSrv,GroupsCenterSrv,$stateParams) {
	var api_url = ApiSrv.groupsCenter.get_as_detail.url;
	GroupsCenterSrv.actionByIdSrv.action({api:api_url,id:$stateParams.asId,userId:6},function(result){
	 	$scope.data = result.data;
	 });

	// var api_url = ApiSrv.groupsCenter.get_as_detail.testUrl;
	// GroupsCenterSrv.actionSrv.action({api:api_url},function(result){
	//  	$scope.data = result.data;
	//  });
}])
;
