'use strict';

angular.module('mark.myGroups')
.controller('MyGroupsMainCtrl', ['$scope', 'AccountSrv', 'MyGroupsSrv', function($scope, AccountSrv, MyGroupsSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
    $scope.infoField = $scope.user.interests;
    MyGroupsSrv.getMyGroups($scope.user.id).then(succ, fail);

    function succ(groups){
      $scope.joinedGroups = groups.joinedGroups;
      $scope.createdGroups = groups.createdGroups;
    }
  }

  function fail(err){
    alert(err);
  }

  //$scope.joinedGroups = [
  //  {id: '', title: '沙拉计划', memberCount: '', activityCount: '', slogan: '阅八百年波澜壮阔，看我今日处变不惊', img: 'http://placehold.it/42x42'},
  //  {id: '', title: 'Ac建筑英杰“雏鹰”读书会', memberCount: '', activityCount: '', slogan: '相互交流，共同进步。有价值的资源值得被更多的人分享。', img: 'http://placehold.it/42x42'},
  //  {id: '', title: '混沌和秩序', memberCount: '', activityCount: '', slogan: '重新认识科学。', img: 'http://placehold.it/42x42'},
  //  {id: '', title: '混沌和秩序', memberCount: '', activityCount: '', slogan: '重新认识科学。', img: 'http://placehold.it/42x42'},
  //  {id: '', title: '混沌和秩序', memberCount: '', activityCount: '', slogan: '重新认识科学。', img: 'http://placehold.it/42x42'},
  //];

  //$scope.createdGroups = [
  //  {id: '', title: '沙拉计划成员活动', memberCount: '', activityCount: '', slogan: '阅八百年波澜壮阔，看我今日处变不惊', img: 'http://placehold.it/42x42'},
  //  {id: '', title: 'Ac建筑英杰“雏鹰”读书会', memberCount: '', activityCount: '', slogan: '相互交流，共同进步。有价值的资源值得被更多的人分享。', img: 'http://placehold.it/42x42'},
  //  {id: '', title: '混沌和秩序', memberCount: '', activityCount: '', slogan: '重新认识科学。', img: 'http://placehold.it/42x42'},
  //];

  var activeGroupSection = 'joinedGroups';
  $scope.selectGroupSection = function(section){
    switch(section){
      case 'joinedGroups':
        activeGroupSection = 'joinedGroups';
        break;
      case 'createdGroups':
        activeGroupSection = 'createdGroups';
        break;
    }
  };

  $scope.isActive = function(section){
    if(activeGroupSection==section) return true;
    return false;
  };

}]);
