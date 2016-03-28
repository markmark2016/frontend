// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
//
angular.module('mark', ['ionic','LocalStorageModule', 'mark.dialog', 'mark.filters', 'mark.controllers', 'mark.services', 'mark.groupsCenter', 'mark.userCenter', 'mark.myGroups', 'mark.profile', 'mark.editProfile', 'mark.remark'])

.run(['$ionicPlatform', function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
}])

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
}])

.config(['localStorageServiceProvider', function(localStorageServiceProvider){
  localStorageServiceProvider.setPrefix('mark');
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'tpl/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.404', {
    url: '/404',
    views: {
      'tab-404': {
        templateUrl: 'tpl/404.html',
        controller: '404MainCtrl'
      }
    }
  })
  .state('tab.groups-center', {
    url: '/groups-center',
    views: {
      'tab-groups-center': {
        templateUrl: 'modules/groupsCenter/tab-groupsCenter-tpl.html',
        controller: 'GroupsCenterMainCtrl'
      }
    }
  })
  .state('tab.group-detail', {
    url: '/group/:groupId',
    views: {
      'tab-groups-center': {
        templateUrl: 'modules/groupsCenter/group-detail.html',
        controller: 'GroupDetailCtrl'
      }
    }
  })
  .state('tab.group-detail.intr', {
    url: '/intr',
    views: {
      'tab-group-detail': {
        templateUrl: 'modules/groupsCenter/group-detail-intr.html'
      }
    }
  })
  .state('tab.group-detail.comment', {
    url: '/comment',
    views: {
      'tab-group-detail': {
        templateUrl: 'modules/groupsCenter/group-detail-comment.html',
        controller: 'GroupDetailCommentCtrl'
      }
    }
  })
  .state('tab.group-detail.activity', {
    url: '/activity',
    views: {
      'tab-group-detail': {
        templateUrl: 'modules/groupsCenter/group-detail-activity.html'
      }
    }
  })
  .state('tab.as-detail', {
    url: '/as/:asId',
    views: {
      'tab-groups-center': {
        templateUrl: 'modules/groupsCenter/as-detail.html',
        controller: 'AsDetailCtrl'
      }
    }
  })
  .state('tab.user-center', {
    url: '/user-center',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/userCenter/tab-userCenter-tpl.html',
        controller: 'UserCenterMainCtrl'
      }
    }
  })
  .state('tab.my-groups', {
    url: '/my-groups',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/myGroups/templates/my-groups-tpl.html',
        controller: 'MyGroupsMainCtrl'
      }
    }
  })
  .state('tab.page', {
    url: '/page',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/page/page-tpl.html',
        controller: 'PageMainCtrl'
      }
    }
  })
  .state('tab.edit-profile', {
    url: '/edit-profile',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-profile-tpl.html',
        controller: 'EditProfileMainCtrl'
      }
    }
  })
  .state('tab.select-book', {
    url: '/select/:selectType/book/:bookId',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/select-book-tpl.html',
        controller: 'SelectBookMainCtrl'
      }
    }
  })
  .state('tab.edit-gender', {
    url: '/edit-gender',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-gender-tpl.html',
        controller: 'EditGenderMainCtrl'
      }
    }
  })
  .state('tab.edit-interests', {
    url: '/edit-interests',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-one-line-info-tpl.html',
        controller: 'EditInterestsMainCtrl'
      }
    }
  })
  .state('tab.edit-description', {
    url: '/edit-description',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-description-tpl.html',
        controller: 'EditDescriptionMainCtrl'
      }
    }
  })
  .state('tab.select-region-city', {
    url: '/select-region-city',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/select-region-city-tpl.html',
        controller: 'SelectRegionCityMainCtrl'
      }
    }
  })
  .state('tab.edit-region', {
    url: '/edit-region/:regionCity',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-region-tpl.html',
        controller: 'EditRegionMainCtrl'
      }
    }
  })
  .state('tab.edit-occupation', {
    url: '/edit-occupation',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-one-line-info-tpl.html',
        controller: 'EditOccupationMainCtrl'
      }
    }
  })
  .state('tab.edit-college', {
    url: '/edit-college',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-one-line-info-tpl.html',
        controller: 'EditCollegeMainCtrl'
      }
    }
  })
  .state('tab.edit-constellation', {
    url: '/edit-constellation',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-constellation-tpl.html',
        controller: 'EditConstellationMainCtrl'
      }
    }
  })
  .state('tab.edit-relationship', {
    url: '/edit-relationship',
    views: {
      'tab-user-center': {
        templateUrl: 'modules/editProfile/templates/edit-relationship-tpl.html',
        controller: 'EditRelationshipMainCtrl'
      }
    }
  })
  .state('tab.punch-center', {
    url: '/punch-center',
    views: {
      'tab-punch-center': {
        templateUrl: 'modules/punchCardCenter/punch-list.html',
        controller: 'PunchesListCtrl'
      }
    }
  })
  .state('tab.edit-remark', {
    url: '/edit-remark/:groupId',
    views: {
      'tab-punch-center': {
        templateUrl: 'modules/punchCardCenter/edit-remark.html',
        controller: 'EditRemarkCtrl'
      }
    },
    params: {
      groupId: null
    }
  })
  .state('tab.remark-today', {
    url: '/remark-today/:groupId/:userId',
    views: {
      'tab-punch-center': {
        templateUrl: 'modules/punchCardCenter/remark-detail.html',
        controller: 'RemarkDetailController'
      }
    },
    params: {
      groupId: null,
      userId: null
    }
  })
  .state('tab.remark-detail', {
    url: '/remark-detail/:groupId/:userId',
    views: {
      'tab-punch-center': {
        templateUrl: 'modules/punchCardCenter/remark-detail.html',
        controller: 'RemarkDetailController'
      }
    },
    params: {
      groupId: null,
      userId: null
    }
  })
  ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise(function($injector, $location){
    // console.log('state:',$location.path());
    // var path = $location.path();
    // path = path.slice(1);
    // if(path.startsWith('http://') || path.startsWith('https://')){
    //   location.href = path;
    // }
    //return ;
     $location.path('/tab/groups-center');
  });

}])
;
