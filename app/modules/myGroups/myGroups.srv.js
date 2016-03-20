angular.module('mark.myGroups')


.factory('MyGroupsSrv', ['$q', '$http', 'localStorageService', 'HostSrv', 'ApiSrv', function($q, $http, localStorageService, HostSrv, ApiSrv) {
  var S = {
  };

  function transGroupFields(data){
    data.title = data.name;
    data.img = data.book.image;
    data.slogan = data.recruit_annoncement;

    return data;
  }

  S.getMyGroups = function(user_id) {
    var url = HostSrv.main + ApiSrv.myGroups.get_my_groups.url + '&user_id=' + user_id;

    return $http.get(url).then(function(resp){
      var groups = resp.data;
      console.log('myGroups:', groups);
      angular.forEach(groups.joinedGroups, function(group, index){
        transGroupFields(group);
      });
      angular.forEach(groups.createdGroups, function(group, index){
        transGroupFields(group);
      });

      return $q.when(groups);
    },function(err){
      console.log('error:',err);
      return $q.reject(err);
    });
  };

  return S;
}]);
