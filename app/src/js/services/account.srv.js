angular.module('mark.services')

.factory('AccountSrv', ['$q', '$http', 'localStorageService', 'HostSrv', 'ApiSrv', function($q, $http, localStorageService, HostSrv, ApiSrv) {
  var S = {
  };

  function transAccountFields(data){
    data.name = data.nickname;
    data.avatar = data.headimgurl;
    console.log(data.avatar);
    console.log(data.gender);
    data.gender = data.gender || (function(sex){
      if(sex=='1'){
        return 'male';
      }else{
        return 'female';
      }
    })(data.sex);
    //data.interests = '军事、数学、历史';
    //data.description = '掀开扉页，这天地文章的第一章便写着：春之情。这情该如何读的透？元好问这惊人的一句“问世间情为何物”。';
    //data.region = 'Beijing,Haidian';
    //data.occupation = '精算师';
    //data.college = '中国传媒大学';
    //data.constellation = 'gemini';
    //data.relationship = 'secrecy';
    data.slogan = "饭可以一日不吃，觉可以一日不睡，书不可一日不读。";

    return data;
  }

  S.getMyAccount = function() {
    var url = HostSrv.main + ApiSrv.basicAccount.get_my_account.url;

    return $http.get(url).then(function(resp){
      var data = resp.data;
      console.log('myAccount:', data);
      var account = transAccountFields(data)

      //localStorageService.set('account', account);

      return $q.when(account);
    },function(err){
      console.log('error:',err);
      return $q.reject(err);
    });
  };

  S.getAccountLocally = function() {
    return  localStorageService.get('account'); 
  };

  S.getBasicAccout = function(userId) {
    var url = HostSrv.main + ApiSrv.basicAccount.get_basic_account.url + '&user_id=' + userId;

    return $http.get(url).then(function(resp){
      var data = resp.data;
      console.log('myAccount:', data);
      var account = transAccountFields(data)
      return $q.when(account);
    },function(err){
      console.log('error:',err);
      return $q.reject(err);
    });
  };

  S.updateBasicAccount = function(formData){
    var url = HostSrv.main + ApiSrv.basicAccount.update_basic_account.url;

    return $http({
      method: 'POST',
      url: url,
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        return str.join("&");
      },
      data: formData
    }).then(function(resp){
      var data = resp.data;
      console.log('update resp data:',data);
    },function(err){
    });

  };

  return S;
}]);
