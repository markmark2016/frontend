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
    }
  };
}]);
