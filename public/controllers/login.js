(function() {
    angular.module('login', ['ngRoute', 'ngResource','monospaced.elastic','tooltip','truncate'])
        .config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
            $routeProvider    
                .when('/signup', {
                    templateUrl: '/views/signup.html',
                    controller: 'SignupController',
                    controllerAs: 'signup',
                    caseInsensitiveMatch: true
                })
                .when('/login', {
                    templateUrl: '/views/login.html',
                    controller: 'LoginController',
                    controllerAs: 'login',
                    caseInsensitiveMatch: true
                })
                .when('/', {
              templateUrl: '/views/index.html',
              controller: 'BlogController'
            })
                .when('/createblog', {
              templateUrl: '/views/createblog.html',
              controller: 'BlogController'
            })
             .when('/landing', {
              templateUrl: '/views/landing.html',
              controller: 'LandingController'
            })
            .when('/:id', {
              templateUrl: '/views/blogdetails.html',
              controller: 'BlogDetailCtrl'
                });

            $locationProvider.html5Mode(true); //Use html5Mode so your angular routes don't have #/route
        }])
        .controller('LoginController', ['$http', '$scope', function($http, $scope) {
            // Custom Login functionality
        }])
        .controller('IndexController', ['$http', '$scope', function($http, $scope) {
            // Custom Index functionality
        }])
        .controller('SignupController', ['$http', '$scope', function($http, $scope) {
            // Custom Signup functionality
        }])
        .controller('LandingController', ['$http', '$scope', function($http, $scope) {
            // Custom Index functionality
        }])
        .controller('LoginForm', ['$http','$scope', function($http,$scope) {
            $scope.login = function() {
                $http
                    .post('/login', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                         
                    });
            }
            $scope.connect = function() {
                $http
                    .post('/connect/local', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                  
                    });
            }

            
        }])
        .controller('SignupForm', ['$http', '$scope', function($http, $scope) {
            $scope.signup = function() {
                console.log("Boom");
                $http
                    .post('/signup', {
                        email: this.email,
                        password: this.password
                    })
                    .success(function(data) {
                        console.log(data);
                    });
            }
        }])


         //---------------
        // Services
        //---------------
        .factory('Blogs', ['$resource', function($resource){
          return $resource('/blogs/:id', null, {
            'update': { method:'PUT' }  
          });

        }])
           


        //---------------
        // Controllers
        //---------------

        .controller('BlogController', ['$scope', '$http','Blogs','$rootScope','$location', function ($scope,$http,Blogs,$rootScope,$location) {
          $scope.editing = [];
          $scope.blogs = Blogs.query();

          $scope.save = function(){
            if(!$scope.newtitle || $scope.newtitle.length < 1) return;
            var blog = new Blogs({ title: $scope.newtitle,content:$scope.newcontent });

            blog.$save(function(){
              $scope.blogs.push(blog);
              $scope.newtitle = '';
              $scope.newcontent = ''; // clear textbox
               $location.url('/');
            });
          }
      
          $scope.remove = function(index){
            var blog = $scope.blogs[index];
            Blogs.remove({id: blog._id}, function(){
              $scope.blogs.splice(index, 1);
            });
          }
              

      $http.get('/checklogin')
        .success(function(data) {
          console.log(data);
          $rootScope.loggedIn = data;

        })
        .error(function(data) {
          console.log('error: ' + data);
        });
    
        }])

      
        .controller('BlogDetailCtrl', ['$http', '$scope', '$routeParams', 'Blogs', '$location', function ($http,$scope, $routeParams, Blogs, $location, $timeout) {
          $scope.blog = Blogs.get({id: $routeParams.id });

        $scope.update = function(){
            Blogs.update({id: $scope.blog._id}, $scope.blog, function(){
              // $location.url('/');
            });
          }
       
          $scope.remove = function(){
            Blogs.remove({id: $scope.blog._id}, function(){
              $location.url('/');
            });
          }



        }])



})();
