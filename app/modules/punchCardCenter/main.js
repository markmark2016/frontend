'use strict';

angular.module('mark.remark', ['mark.services', 'mark.dialog', 'mark.filters']);

angular.module('mark.remark')
.controller('PunchesListCtrl', ['$scope','$location','$state','RemarkSrv','AccountSrv',function($scope,$location,$state,RemarkSrv,AccountSrv) {
    var userId = AccountSrv.getUserId();
    RemarkSrv.punchesSrv.action({userId: userId},function(result){
        $scope.data = result.data;
    });

    $scope.postPunch = function(groupId) {
        $location.path('/tab/create-remark/' + groupId);
    };
    $scope.showRemarks = function(groupId) {
        $location.path('/tab/remark-today/' + groupId);
    };
    $scope.postRemark = function(groupId) {
        $location.path('/tab/create-remark/' + groupId);
    };
}])
.controller('EditRemarkCtrl', ['$scope', 'RemarkSrv', 'CommonSrv', '$stateParams', '$location', 'alertDialog', 'AccountSrv', function($scope, RemarkSrv, CommonSrv, $stateParams, $location, alertDialog, AccountSrv) {
    var userId = AccountSrv.getUserId();
    var groupId = $stateParams.groupId;
    var remarkId = $stateParams.remarkId;
    $scope.group = {};
    $scope.edit = {};
    $scope.edit.photos = [];
    $scope.createNew = (remarkId ? false : true);

    if ($scope.createNew) {
        RemarkSrv.punchesSrv.action({userId: userId},function(result){
            for (var i = 0; i < result.data.length; i++) {
                if (result.data[i].groupId == groupId) {
                    $scope.group = result.data[i];
                    break;
                }
            }
        });
    } else {
        RemarkSrv.getRemarkDetailSrv.action({
            remarkId: remarkId
        }, function getRemarkCallback(result) {
            $scope.remark = result.data;
            $scope.edit.remarkPageStart = result.data.remark.startPage;
            $scope.edit.remarkPageEnd = result.data.remark.endPage;
            $scope.edit.remarkTitle = result.data.remark.title;
            $scope.edit.remarkContent = result.data.remark.comment;
            var pictureUrlSplit = $scope.remark.pictureUrl.split(',');
            var pictureUrls = [];
            for (var i = 0; i < pictureUrlSplit.length; i++) {
                var canPushUrl = true;
                for (var j = 0; j < pictureUrls.length; j++) {
                    if (pictureUrlSplit[i] == pictureUrls[j]) {
                        canPushUrl = false;
                        break;
                    }
                }
                if (canPushUrl) pictureUrls.push(pictureUrlSplit[i]);
            }
            $scope.remark.remark.pictureUrls = pictureUrls;
            for (var i = 0; i < pictureUrls.length; i++) {
                $scope.edit.photos.push({
                    fileObj: null,
                    uploaded: true,
                    error: false,
                    src: pictureUrls[i]
                });
            }
            RemarkSrv.punchesSrv.action({userId: userId},function(result){
                for (var i = 0; i < result.data.length; i++) {
                    if (result.data[i].groupId == $scope.remark.remark.groupIdFk) {
                        $scope.group = result.data[i];
                        break;
                    }
                }
            });
        });
    }

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
        $scope.edit.photos.push(fileStruct);
        $scope.$apply();
        fileReader.onload = function(data) {
            fileStruct.src = fileReader.result;
            $scope.$apply();
            CommonSrv.upload(fileStruct.fileObj, function(data) {
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

    $scope.deletePhoto = function (photoStruct) {
        for (var i = 0; i < $scope.edit.photos.length; i++) {
            if ($scope.edit.photos[i] == photoStruct) {
                $scope.edit.photos.splice(i,1);
            }
        }
    };

    function getPhotoUrls () {
        var urls = [];
        for (var i = 0; i < $scope.edit.photos.length; i++) {
            if ($scope.edit.photos[i].uploaded && !$scope.edit.photos[i].error) urls.push($scope.edit.photos[i].src);
        }
        return urls;
    };

    $scope.isAllPhotoUploaded = function() {
        for (var i = 0; i < $scope.edit.photos.length; i++) {
            if (!$scope.edit.photos[i].uploaded) {
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
            startPage: $scope.edit.remarkPageStart || "",
            endPage: $scope.edit.remarkPageEnd || "",
            title: $scope.edit.remarkTitle || "",
            comment: $scope.edit.remarkContent || "",
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
            title: $scope.edit.remarkTitle || "",
            comment: $scope.edit.remarkContent || "",
            pictureUrl: getPhotoUrls().join(',')
        }, function(result) {
            $location.path('/tab/remark-today/' + groupId);
        }, function(error) {
            alertDialog($scope, '提交失败', "服务器开小差了，请稍等一下");
        });
    };

    $scope.updateRemark = function() {
        RemarkSrv.updateRemarkSrv.action({}, {
            remarkId: $stateParams.remarkId,
            title: $scope.edit.remarkTitle || "",
            comment: $scope.edit.remarkContent || "",
            pictureUrl: getPhotoUrls().join(',')
        }, function(result) {
            $location.path('/tab/remark-today/' + groupId);
        }, function(error) {
            alertDialog($scope, '提交失败', "服务器开小差了，请稍等一下");
        });
    };
}])
.controller('RemarkDetailController', ['$scope', 'RemarkSrv', 'AccountSrv', '$stateParams', 'alertDialog', function($scope, RemarkSrv, AccountSrv, $stateParams, alertDialog) {
    var groupId = $stateParams.groupId;
    var userId = AccountSrv.getUserId();
    var remarkId = $stateParams.remarkId;
    $scope.userId = userId;
    $scope.remarkId = remarkId;

    $scope.group = {};
    $scope.remark = {};

    $scope.remarkLiked = false;

    function getRemarkCallback(result) {
        $scope.remark = result.data;
        var pictureUrlSplit = $scope.remark.pictureUrl.split(',');
        var pictureUrls = [];
        for (var i = 0; i < pictureUrlSplit.length; i++) {
            var canPushUrl = true;
            for (var j = 0; j < pictureUrls.length; j++) {
                if (pictureUrlSplit[i] == pictureUrls[j]) {
                    canPushUrl = false;
                    break;
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
            authorId: $scope.remark.remark.userIdFk,
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
                userId: userId,
                authorId: $scope.remark.remark.userIdFk
            }, function() {
                refreshRemark();
            }, function() {
                alertDialog($scope, '点赞失败', "服务器开小差了，请稍等一下");
            });
        }
    };
}])
;
