'use strict';

angular.module('mark.editProfile')
.controller('SelectBookMainCtrl', ['$scope', '$stateParams', '$location', 'AccountSrv', function($scope, $stateParams, $location, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
  }

  function fail(err){
    alert(err);
  }

  $scope.selectType = $stateParams.selectType;
  $scope.selectTypeTitle = (function(type){
    switch(type){
      case 'favorite':
        return '喜欢的书';
      case 'bookList':
        return '想看的书';
      default:
        return '搜索图书';
    }
  })($scope.selectType);

  $scope.bookId = $stateParams.selectType;

  $scope.searchText = "";
  $scope.searchResults = [];
  $scope.onSearch = function(text){
    console.log('searching:', text);
    if(text=="") return;
    console.log('search done');
    $scope.searchResults = [
      {id: '', title: '一个人的朝圣', desc: '一个人的朝圣一个人的朝圣一个人的朝圣一个人的朝圣一个人的朝圣一个人的朝圣', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
      {id: '', title: '人间词话', desc: '人间词话人间词话人间词话人间词话人间词话人间词话人间词话人间词话人间词话人间词话人间词话人间词话人间词话', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
      {id: '', title: '当你的才华还撑不起你的野心', desc: '当你的才华还撑不起你的野心当你的才华还撑不起你的野心当你的才华还撑不起你的野心当你的才华还撑不起你的野心当你的才华还撑不起你的野心', img: 'https://img3.doubanio.com/spic/s1113106.jpg'},
    ];
  };

  $scope.onBookSelect = function(book){
    console.log(book);
    $location.url('/tab/profile');
  };

}]);
