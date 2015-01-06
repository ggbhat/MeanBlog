

angular.module('userservice',[])
  .factory('Auth', function ($scope,$http) {
    
    
     $http.get('/checklogin')
        .success(function(data) {
          console.log(data);
          $rootScope.loggedIn = data;
          
        })
        .error(function(data) {
          console.log('error: ' + data);
        });

      
    
  })
  