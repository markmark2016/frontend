'use strict';

angular.module('mark.editProfile')
.controller('EditProfileMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
  }

  function fail(err){
    alert(err);
  }

  $scope.favoriteBooks = [
    {id: '1', title: '一个人的朝圣', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
    {id: '2', title: '人间词话', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
    {id: '3', title: '当你的才华还撑不起你的野心', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
  ];

  $scope.bookList = [
    {id: '1', title: '当你的才华还撑不起你的野心', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
    {id: '2', title: '一个人的朝圣', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
    {id: '3', title: '人间词话', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
  ];
}]);
