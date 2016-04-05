angular.module('mark.dialog', []);

angular.module('mark.dialog')
.factory('alertDialog', ['$ionicPopup', function($ionicPopup) {
    return function($scope, msgTitle, msgContent, callback) {
        $scope.popup = $scope.popup || {};
        // $scope.popup.params = $scope.popup.params || {};
        // $scope.popup.params.alert = $scope.popup.params.alert || {};
        $scope.popup.alert = $ionicPopup.alert({
            title: msgTitle,
            subTitle: msgContent,
            okText: "好的"
        });
        $scope.popup.alert.then(callback);
        $scope.$on('$destroy', function() {
            $scope.popup.alert.remove();
        });
    };
}])
.factory('needFocusDialog', ['$ionicPopup', function($ionicPopup) {
    return function($scope) {
        var popup = $ionicPopup.show({
            template: '<div class="need-focus-dialog"><p>请先关注<em>MarkMark</em>公众号，然后从公众号点击小组进入</p><img src="./src/img/qr_code.jpg"/></div>',
            // title: 'Enter Wi-Fi Password',
            // subTitle: 'Please use normal things',
            scope: $scope,
            buttons: [
                { text: '好的' }
            ]
        });
    };
}])
;