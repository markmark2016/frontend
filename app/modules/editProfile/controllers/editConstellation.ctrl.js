'use strict';

angular.module('mark.editProfile')
.controller('EditConstellationMainCtrl', ['$scope', 'AccountSrv', function($scope, AccountSrv) {

  AccountSrv.getMyAccount().then(succ, fail);

  function succ(account){
    $scope.user = account;
  }

  function fail(err){
    alert(err);
  }

  //$scope.user = {
  //  name: '小糊涂神',
  //  gender: 'female',
  //  interests: '军事、数学、历史',
  //  description: '掀开扉页，这天地文章的第一章便写着：春之情。这情该如何读的透？元好问这惊人的一句“问世间情为何物”。',
  //  region: '北京',
  //  occupation: '精算师',
  //  college: '中国传媒大学',
  //  constellation: 'gemini',
  //  relationship: 'secrecy',
  //  slogan: "饭可以一日不吃，觉可以一日不睡，书不可一日不读。",
  //};

  $scope.constellations = [
    {value: 'aries', title: '白羊座'},
    {value: 'taurus', title: '金牛座'},
    {value: 'gemini', title: '双子座'},
    {value: 'cancer', title: '巨蟹座'},
    {value: 'leo', title: '狮子座'},
    {value: 'virgo', title: '处女座'},
    {value: 'libra', title: '天秤座'},
    {value: 'scorpio', title: '天蝎座'},
    {value: 'sagittarius', title: '射手座'},
    {value: 'capricorn', title: '摩羯座'},
    {value: 'aquarius', title: '水瓶座'},
    {value: 'pisces', title: '双鱼座'},
  ];

  $scope.onConstellationChange = function(c){
    console.log(c);
    AccountSrv.updateBasicAccount({
      update_field: 'constellation',
      update_value: c.value
    });
  };

}]);
