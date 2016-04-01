'use strict';

angular.module('mark.editProfile')
.controller('SelectBookMainCtrl', ['$scope', '$stateParams', '$location', 'AccountSrv', 'CommonSrv', function($scope, $stateParams, $location, AccountSrv, CommonSrv) {

  var userId = AccountSrv.getUserId();
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  $scope.selectType = $stateParams.selectType;
  $scope.selectTypeTitle = (function(type){
    switch(type){
      case 'like':
        return '喜欢的书';
      case 'want':
        return '想看的书';
      default:
        return '搜索图书';
    }
  })($scope.selectType);

  $scope.bookId = $stateParams.selectType;

  $scope.search = {};
  $scope.search.text = "";
  $scope.search.results = [];

  var lastSearchText = "";
  var lastSearchTime = 0;
  var SEARCH_INTERVAL = 1000;
  // if (!window.selectBookTimer) {
  //   window.selectBookTimer = setInterval(function() {
  //     if ($scope.search.text != lastSearchText) {
  //       if ($scope.search.text) {
  //         var timestamp = new Date().getTime();
  //         CommonSrv.getDoubanBooks.action({
  //           q: $scope.search.text,
  //         }, function(result) {
  //           if (lastSearchTime < timestamp) {
  //             $scope.search.results = result.books;
  //             lastSearchTime = timestamp;
  //           }
  //         });
  //       } else {
  //         $scope.search.results = [];
  //         $scope.$apply();
  //       }
  //       lastSearchText = $scope.search.text;
  //     }
  //   }, SEARCH_INTERVAL);
  // }
  $scope.onSearchTextChanged = function() {
    if ($scope.search.text != lastSearchText) {
      if ($scope.search.text) {
        var timestamp = new Date().getTime();
        CommonSrv.getDoubanBooks({
          q: $scope.search.text,
        }, function(result) {
          if (lastSearchTime < timestamp) {
            $scope.search.results = result.books;
            lastSearchTime = timestamp;
          }
        });
      } else {
        $scope.search.results = [];
      }
      lastSearchText = $scope.search.text;
    }
  };

  $scope.onBookSelect = function(book){
    AccountSrv.addBook.action({
      userId: userId,
      title: book.title,
      image: (book.images.large || book.images.medium || book.images.small),
      type: AccountSrv.bookTypeMap[$stateParams.selectType]
    }, function() {
      $location.path('/tab/edit-profile');
    }, function() {
      $location.path('/tab/edit-profile');
    });
  };

}]);
