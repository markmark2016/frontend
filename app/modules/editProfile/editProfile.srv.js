angular.module('mark.editProfile')

.factory('RelationshipSrv', [function() {
  var relationships = [
    {value: 'single', title: '单身'},
    {value: 'fallingInLove', title: '恋爱'},
    {value: 'married', title: '已婚'},
    {value: 'secrecy', title: '保密'},
  ];

  var S = {
  };

  S.getRelationships = function(){
    return relationships;
  };

  S.getRelationshipByValue = function(value){
    for(var i in relationships){
      if(relationships[i].value == value)
        return relationships[i];
    }
  };

  return S;
}]);
