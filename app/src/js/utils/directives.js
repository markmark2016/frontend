angular.module('mark')

.directive('integer', function() {
  var INTEGER_REGEXP = /^\-?\d+$/;
  return {
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {
      ctrl.$validators.integer = function(modelValue, viewValue) {
        if (ctrl.$isEmpty(modelValue)) {
          // consider empty models to be valid
          return true;
        }

        if (INTEGER_REGEXP.test(viewValue)) {
          // it is valid
          return true;
        }

        // it is invalid
        return false;
      };
    }
  };
})
// .directive('min', function() {
//   return {
//     require: 'ngModel',
//     link: function(scope, elm, attrs, ctrl) {
//       ctrl.$validators.integer = function(modelValue, viewValue) {
//         if (ctrl.$isEmpty(modelValue)) {
//           // consider empty models to be valid
//           return true;
//         }

//         if (viewValue) {
//           // it is valid
//           return true;
//         }

//         // it is invalid
//         return false;
//       };
//     }
//   };
// })
;