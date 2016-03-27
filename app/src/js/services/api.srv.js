angular.module('mark.services')

.factory('ApiSrv', [function() {
  return {
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
        testUrl:'groups.json'
      },
      get_ass: {
        method: 'GET',
        url: 'associations',
        testUrl:'associations.json'
      },
      get_group_detail: {
        method: 'GET',
        url: 'groups',
        testUrl:'group.json'
      },
      get_as_detail: {
        method: 'GET',
        url: 'associations',
        testUrl:'as.json'
      },
      get_group_users: {
        method: 'GET',
        url: 'groups',
        testUrl:'group_users.json'
      },
    },
    remark: {
      get_punch: {
        method: 'GET',
        url: 'remark/punch',
        testUrl: 'remark/punch.json'
      },
      post_create: {
        method: 'POST',
        url: 'remark/create'
      },
      post_complete: {
        method: 'POST',
        url: 'remark/complete'
      },
      get_today: {
        method: 'GET',
        url: 'remark/today'
      },
      get_group: {
        method: 'GET',
        url: 'remark/group'
      },
      get_remark: {
        method: 'GET',
        url: 'remark'
      },
      post_like: {
        method: 'GET',
        url: 'remark/like'
      },
      post_reply: {
        method: 'GET',
        url: 'remark/reply'
      }
    }


  };
}]);
