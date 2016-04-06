angular.module('mark.services')

.factory('ApiSrv', ['HostSrv', function(HostSrv) {
  var productiveApis = {
    common: {
      upload: {
        method: 'POST',
        url: 'upload'
      },
      wechat_jsapi: {
        method: 'GET',
        url: 'wechat/js'
      }
    },
    account: {
      userInfo: {
        method: 'GET',
        url: 'users/:userId'
      },
      userDetail: {
        method: 'GET',
        url: 'users/details/:userId'
      },
      userUpdate: {
        method: 'PUT',
        url: 'users/details/:userId'
      },
      userGroups: {
        method: 'GET',
        url: 'users/:userId/group'
      },
      userRank: {
        method: 'GET',
        url: 'users/:userId/rank'
      },
      userScore: {
        method: 'GET',
        url: 'users/:userId/score'
      },
      userRankInGroup: {
        method: 'GET',
        url: 'users/:userId/rank/:groupId'
      },
      userReaded: {
        method: 'GET',
        url: 'users/:userId/readed'
      },
      userPunches: {
        method: 'GET',
        url: 'users/:userId/punch'
      },
      userPunchDetail: {
        method: 'GET',
        url: 'remark/users/:userId'
      },
      userRemarks: {
        method: 'GET',
        url: 'users/:userId/remark'
      },
      userRemarkOfGroup: {
        method: 'GET',
        url: 'users/:userId/remark/:groupId'
      },
      userAddBook: {
        method: 'POST',
        url: 'users/book/save'
      },
      userDeleteBook: {
        method: 'POST',
        url: 'users/book/delete'
      }
    },
    groupsCenter:{
      get_groups: {
        method: 'GET',
        url: 'groups',
      },
      get_ass: {
        method: 'GET',
        url: 'associations',
      },
      get_group_detail: {
        method: 'GET',
        url: 'groups/:id',
      },
      get_as_detail: {
        method: 'GET',
        url: 'associations/:id',
      },
      get_group_users: {
        method: 'GET',
        url: 'groups/:id/users',
      },
      post_join_group: {
        method: 'POST',
        url: 'groups/join'
      },
      post_quit_group: {
        method: 'POST',
        url: 'groups/quit'
      },
      post_apply_group: {
        method: 'POST',
        url: 'groups/apply'
      }
    },
    remark: {
      get_punch: {
        method: 'GET',
        url: 'remark/punch/:userId',
      },
      post_create: {
        method: 'POST',
        url: 'remark/create/:groupId/:userId'
      },
      post_complete: {
        method: 'POST',
        url: 'remark/complete/:groupId/:userId'
      },
      post_update: {
        method: 'POST',
        url: 'remark/update'
      },
      get_today: {
        method: 'GET',
        url: 'remark/today/:groupId/:userId'
      },
      get_group: {
        method: 'GET',
        url: 'remark/group/:groupId'
      },
      get_remark: {
        method: 'GET',
        url: 'remark/:remarkId'
      },
      post_like: {
        method: 'POST',
        url: 'remark/like'
      },
      post_reply: {
        method: 'POST',
        url: 'remark/reply'
      }
    },
    message: {
      get_summary: {
        method: 'GET',
        url: 'msg/:userId'
      },
      get_sys_list: {
        method: 'GET',
        url: 'msg/sys/:userId'
      },
      get_like_list: {
        method: 'GET',
        url: 'msg/like/:userId'
      },
      get_reply_list: {
        method: 'GET',
        url: 'msg/reply/:userId'
      }
    }
  };

  var stagingApis = {
    common: {
      upload: {
        method: 'GET',
        url: 'upload.json'
      },
      wechat_jsapi: {
        method: 'GET',
        url: 'weixin_jsapi.json'
      }
    },
    account: {
      userInfo: {
        method: 'GET',
        url: 'account/user-info.json'
      },
      userDetail: {
        method: 'GET',
        url: 'account/user-detail.json'
      },
      userUpdate: {
        method: 'PUT',
        url: 'users/details/:userId'
      },
      userGroups: {
        method: 'GET',
        url: 'account/user-group.json'
      },
      userRank: {
        method: 'GET',
        url: 'account/user-rank.json'
      },
      userScore: {
        method: 'GET',
        url: 'account/user-score.json'
      },
      userRankInGroup: {
        method: 'GET',
        url: 'account/user-rank-ingroup.json'
      },
      userReaded: {
        method: 'GET',
        url: 'account/user-read.json'
      },
      userPunches: {
        method: 'GET',
        url: 'account/user-punch.json'
      },
      userPunchDetail: {
        method: 'GET',
        url: 'account/user-punch-day.json'
      },
      userRemarks: {
        method: 'GET',
        url: 'account/user-remark.json'
      },
      userRemarkOfGroup: {
        method: 'GET',
        url: 'account/user-remark-ingroup.json'
      },
      userAddBook: {
        method: 'GET',
        url: 'none.json'
      },
      userDeleteBook: {
        method: 'GET',
        url: 'none.json'
      }
    },
    groupsCenter:{
      get_groups: {
        method: 'GET',
        url: 'groups.json'
      },
      get_ass: {
        method: 'GET',
        url: 'associations.json'
      },
      get_group_detail: {
        method: 'GET',
        url: 'group.json'
      },
      get_as_detail: {
        method: 'GET',
        url: 'as.json'
      },
      get_group_users: {
        method: 'GET',
        url: 'group_users.json'
      },
      post_join_group: {
        method: 'POST',
        url: 'none.json'
      },
      post_quit_group: {
        method: 'POST',
        url: 'none.json'
      },
      post_apply_group: {
        method: 'POST',
        url: 'none.json'
      }
    },
    remark: {
      get_punch: {
        method: 'GET',
        url: 'remark/punch.json'
      },
      post_create: {
        method: 'POST',
        url: 'none.json'
      },
      post_complete: {
        method: 'POST',
        url: 'none.json'
      },
      post_update: {
        method: 'POST',
        url: 'remark/update'
      },
      get_today: {
        method: 'GET',
        url: 'remark/remark-detail.json'
      },
      get_group: {
        method: 'GET',
        url: 'remark/group-remarks.json'
      },
      get_remark: {
        method: 'GET',
        url: 'remark/remark-detail.json'
      },
      post_like: {
        method: 'GET',
        url: 'none.json'
      },
      post_reply: {
        method: 'GET',
        url: 'none.json'
      }
    },
    message: {
      get_summary: {
        method: 'GET',
        url: 'message/summary.json'
      },
      get_sys_list: {
        method: 'GET',
        url: 'message/sys-list.json'
      },
      get_like_list: {
        method: 'GET',
        url: 'message/like-list.json'
      },
      get_reply_list: {
        method: 'GET',
        url: 'message/reply-list.json'
      }
    }
  };

  if (HostSrv.env == "staging") {
    return stagingApis;
  } else {
    return productiveApis;
  }
}]);
