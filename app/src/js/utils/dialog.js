angular.module('mark.dialog', []);

angular.module('mark.dialog')
.factory('alertDialog', ['$ionicPopup', function($ionicPopup) {
    return function($scope, msgTitle, msgContent) {
        $scope.popup = $scope.popup || {};
        // $scope.popup.params = $scope.popup.params || {};
        // $scope.popup.params.alert = $scope.popup.params.alert || {};
        $scope.popup.alert = $ionicPopup.alert({
            title: msgTitle,
            subTitle: msgContent,
            okText: "好的"
        });
        $scope.$on('$destroy', function() {
            $scope.popup.alert.remove();
        });
    };
}])