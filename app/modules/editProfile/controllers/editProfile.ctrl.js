'use strict';

angular.module('mark.editProfile')
.controller('EditProfileMainCtrl', ['$scope', 'AccountSrv', 'alertDialog', function($scope, AccountSrv, alertDialog) {
  var userId = AccountSrv.getUserId();
  $scope.genderMap = AccountSrv.genderMap;
  $scope.affectiveMap = AccountSrv.affectiveMap;
  AccountSrv.getUserDetail.action({ userId: userId }, function(result) {
    $scope.user = result.data.user;
    $scope.bookList = result.data.bookList;
  });

  $scope.readOnly = {
    common: false,
    head: true,
    gender: true,
    region: true
  };

  $scope.deleteBook = function (type, book) {
    AccountSrv.deleteBook.action({}, {
      userId: userId,
      bookId: book.id,
      type: AccountSrv.bookTypeMap[type]
    }, function() {
      var bookList;
      if (type == 'like') bookList = $scope.bookList.likeList;
      if (type == 'want') bookList = $scope.bookList.wantList;
      for (var i = 0; i < bookList.length; i++) {
        if (bookList[i].id == book.id) {
          bookList.splice(i,1);
          break;
        }
      }
    }, function() {
      alertDialog($scope, '删除失败', "服务器开小差了，请稍等一下");
    });
  }
}]);
