'use strict';

var userId = 6;

angular.module('mark.remark', ['mark.services', 'mark.dialog', 'mark.filters']);

angular.module('mark.remark')
.controller('PunchesListCtrl', ['$scope','$location','$state','RemarkSrv',function($scope,$location,$state,RemarkSrv) {
    RemarkSrv.punchesSrv.action({userId: userId},function(result){
        $scope.data = result.data;
    });

    $scope.postPunch = function(groupId) {
        $location.path('/tab/edit-remark/' + groupId);
    };
    $scope.showRemarks = function(groupId) {
        $location.path('/tab/remark-today/' + groupId);
    };
    $scope.postRemark = function(groupId) {
        $location.path('/tab/edit-remark/' + groupId);
    };
}])
.controller('EditRemarkCtrl', ['$scope', 'RemarkSrv', 'CommonSrv', '$stateParams', '$location', 'alertDialog', function($scope, RemarkSrv, CommonSrv, $stateParams, $location, alertDialog) {
    var groupId = $stateParams.groupId;
    $scope.group = {};
    $scope.photos = [];

    RemarkSrv.punchesSrv.action({userId: userId},function(result){
        for (var i = 0; i < result.data.length; i++) {
            if (result.data[i].groupId == groupId) {
                $scope.group = result.data[i];
                break;
            }
        }
    });

    $('.view-edit-remark').resize(function() {
        var viewHeight = $(this).height();
        if (!viewHeight) return;
        var listHeight = $(this).find('.list').height();
        var contentHeight = $(this).find('.input-content').find('textarea').height();
        contentHeight = contentHeight + viewHeight - listHeight;
        $(this).find('.input-content').find('textarea').css('height', contentHeight + 'px');
    });
    $('.view-edit-remark').resize();

    $scope.takePhoto = function($event) {
        setTimeout(function() {
            var fileEl = $($event.target).siblings('.input-file');
            fileEl.off('change.photo');
            fileEl.one('change.photo', function() {
                photoSelected(this);
            });
            fileEl.click();
        }, 1);
    };

    function photoSelected (fileEl) {
        for (var i = 0; i < fileEl.files.length; i++) {
            var fileObj = fileEl.files[i];
            uploadPhoto(fileObj);
        }
    };

    function uploadPhoto (fileObj) {
        if (fileObj.type.split('/')[0] !== "image") return;
        var fileReader = new FileReader();
        var fileStruct = {
            fileObj: fileObj,
            uploaded: false,
            error: false,
            src: ""
        };
        $scope.photos.push(fileStruct);
        $scope.$apply();
        fileReader.onload = function(data) {
            fileStruct.src = fileReader.result;
            $scope.$apply();
            CommonSrv.upload(fileStruct.fileObj, function(data) {
                console.log(fileStruct);
                fileStruct.error = false;
                fileStruct.uploaded = true;
                fileStruct.src = data.pictureUrl;
                $scope.$apply();
            }, function(error) {
                fileStruct.error = true;
                fileStruct.uploaded = true;
                $scope.$apply();
            });
        };
        fileReader.readAsDataURL(fileStruct.fileObj);
    };

    function getPhotoUrls () {
        var urls = [];
        for (var i = 0; i < $scope.photos.length; i++) {
            if ($scope.photos[i].uploaded && !$scope.photos[i].error) urls.push($scope.photos[i].src);
        }
        return urls;
    };

    $scope.isAllPhotoUploaded = function() {
        for (var i = 0; i < $scope.photos.length; i++) {
            if (!$scope.photos[i].uploaded) {
                return false;
            }
        }
        return true;
    };

    $scope.createRemark = function() {
        RemarkSrv.createRemarkSrv.action({
            groupId: groupId,
            userId: userId
        }, {
            startPage: $scope.remarkPageStart || "",
            endPage: $scope.remarkPageEnd || "",
            title: $scope.remarkTitle || "",
            comment: $scope.remarkContent || "",
            pictureUrl: getPhotoUrls().join(',')
        }, function(result) {
            $location.path('/tab/remark-today/' + groupId);
        }, function(error) {
            alertDialog($scope, '提交失败', "服务器开小差了，请稍等一下");
        });
    };

    $scope.completeRemark = function() {
        RemarkSrv.completeRemarkSrv.action({
            groupId: groupId,
            userId: userId
        }, {
            title: $scope.remarkTitle || "",
            comment: $scope.remarkContent || "",
            pictureUrl: getPhotoUrls().join(',')
        }, function(result) {
            $location.path('/tab/remark-today/' + groupId);
        }, function(error) {
            alertDialog($scope, '提交失败', "服务器开小差了，请稍等一下");
        });
    };
}])
.controller('RemarkDetailController', ['$scope', 'RemarkSrv', '$stateParams', 'alertDialog', function($scope, RemarkSrv, $stateParams, alertDialog) {
    var groupId = $stateParams.groupId;
    // var userId = $stateParams.userId || userId;
    var remarkId = $stateParams.remarkId;

    $scope.group = {};
    $scope.remark = {};

    $scope.remarkLiked = false;

    function getRemarkCallback(result) {
        $scope.remark = result.data;
        var pictureUrlSplit = $scope.remark.remark.pictureUrl.split(',');
        var pictureUrls = [];
        for (var i = 0; i < pictureUrlSplit.length; i++) {
            var canPushUrl = true;
            for (var j = 0; j < pictureUrls.length; j++) {
                if (pictureUrlSplit[i] == pictureUrls[j]) {
                    canPushUrl = false;
                }
            }
            if (canPushUrl) pictureUrls.push(pictureUrlSplit[i]);
        }
        $scope.remark.remark.pictureUrls = pictureUrls;
        for (var i = 0; i < $scope.remark.likelist.length; i++) {
            if ($scope.remark.likelist[i].userId == userId) {
                remarkLiked = true;
                break;
            }
        }
        RemarkSrv.punchesSrv.action({userId: userId},function(result){
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].groupId == $scope.remark.remark.groupIdFk) {
                    $scope.group = result.data[i];
                    break;
                }
            }
        });
    };

    var refreshRemark;
    if (remarkId) {
        refreshRemark = function () {
            RemarkSrv.getRemarkDetailSrv.action({
                remarkId: remarkId
            }, getRemarkCallback);
        };
    } else {
        refreshRemark = function () {
            RemarkSrv.getTodayRemarkDetailSrv.action({
                groupId: groupId,
                userId: userId
            }, getRemarkCallback);
        };
    }

    refreshRemark();

    $scope.doReply = function() {
        RemarkSrv.postReplySrv.action({}, {
            remarkId: $scope.remark.remark.id,
            userId: userId,
            content: $scope.remarkReplyContent
        }, function() {
            refreshRemark();
            $scope.toggleReply = false;
            $scope.remarkReplyContent = undefined;
        }, function() {
            alertDialog($scope, '回复失败', "服务器开小差了，请稍等一下");
        });
    };

    $scope.doLike = function() {
        if (!$scope.remarkLiked) {
            RemarkSrv.postLikeSrv.action({}, {
                remarkId: $scope.remark.remark.id,
                userId: userId
            }, function() {
                refreshRemark();
            }, function() {
                alertDialog($scope, '点赞失败', "服务器开小差了，请稍等一下");
            });
        }
    };
}])
;
