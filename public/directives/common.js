(function(){
    angular.module('common-directives', [])
        .directive('redir', ['$http', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        e.preventDefault();
                        window.location = attrs.href;
                    });
                }
            }
        }])
        .directive('logout', ['$http', function($http) {
            return {
                restrict: 'A',
                link: function(scope, element, attrs) {
                    element.on('click', function(e) {
                        e.preventDefault();
                        $http.post('/logout');
                    });
                }
            }
        }]);


// .directive('user', ['$http', function($http) {
// return {
//     restrict: 'A',
//     transclude: true,
//     replace: true,     
//     scope:{
//         src:"="       
//     },
//     controller:function($scope){
//         $http.get('/api/userData')
//                 .success(function(data) {
//                     $scope.user = data; //Expose the user data to your angular scope
//                 });
// }
// }
// }]);
})();