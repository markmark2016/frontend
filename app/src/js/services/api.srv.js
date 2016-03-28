angular.module('mark.services')

.factory('ApiSrv', ['HostSrv', function(HostSrv) {
  productiveApis = {
    basicAccount: {
      get_my_account: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_my_account'
      },
      get_basic_account: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_basic_account'
      },
      update_basic_account: {
        method: 'POST',
        url: '/?c=UserCenterAPI&a=update_basic_account'
      }
    },
    account: {
      get_account: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_account'
      }
    },
    myGroups: {
      get_my_groups: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_my_groups'
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
    }
  };

  stagingApis = {
    basicAccount: {
      get_my_account: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_my_account'
      },
      get_basic_account: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_basic_account'
      },
      update_basic_account: {
        method: 'POST',
        url: '/?c=UserCenterAPI&a=update_basic_account'
      }
    },
    account: {
      get_account: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_account'
      }
    },
    myGroups: {
      get_my_groups: {
        method: 'GET',
        url: '/?c=UserCenterAPI&a=get_my_groups'
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
    },
    remark: {
      get_punch: {
        method: 'GET',
        url: 'remark/punch.json'
      },
      post_create: {
        method: 'GET',
        url: 'none.json'
      },
      post_complete: {
        method: 'GET',
        url: 'none.json'
      },
      get_today: {
        method: 'GET',
        url: 'remark/remark-detail.json'
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
        method: 'GET',
        url: 'none.json'
      },
      post_reply: {
        method: 'GET',
        url: 'none.json'
      }
    }
  };

  if (HostSrv.env == "staging") {
    return stagingApis;
  } else {
    return productiveApis;
  }
}]);
