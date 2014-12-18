angular.module('app', ['ngRoute', 'ngResource','monospaced.elastic','tooltip','truncate'])

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

        .controller('BlogController', ['$scope', 'Blogs', function ($scope, Blogs) {
          $scope.editing = [];
          $scope.blogs = Blogs.query();

          $scope.save = function(){
            if(!$scope.newtitle || $scope.newtitle.length < 1) return;
            var blog = new Blogs({ title: $scope.newtitle,content:$scope.newcontent });

            blog.$save(function(){
              $scope.blogs.push(blog);
              $scope.newtitle = '';
              $scope.newcontent = ''; // clear textbox
            });
          }
      
          $scope.remove = function(index){
            var blog = $scope.blogs[index];
            Blogs.remove({id: blog._id}, function(){
              $scope.blogs.splice(index, 1);
            });
          }

        }])

      
        .controller('BlogDetailCtrl', ['$scope', '$routeParams', 'Blogs', '$location', function ($scope, $routeParams, Blogs, $location, $timeout) {
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


        //---------------
        // Routes
        //---------------

        .config(['$routeProvider', function ($routeProvider) {
          $routeProvider
            .when('/', {
              templateUrl: '/blogs.html',
              controller: 'BlogController'
            })

            .when('/:id', {
              templateUrl: '/blogDetails.html',
              controller: 'BlogDetailCtrl'
           // })

           //  .when('/login',{
           //    templateUrl:'/login.html',
           //    controller:'LoginCtrl'
          });
        }]);


//---------------
        // Commented out code for future
        //---------------

// $scope.update = function(index){
          //   var blog = $scope.blogs[index];
          //   Blogs.update({id: blog._id}, blog);
          //   $scope.editing[index] = false;
          // }

          // $scope.edit = function(index){
          //   $scope.editing[index] = angular.copy($scope.blogs[index]);
          // }

          // $scope.cancel = function(index){
          //   $scope.blogs[index] = angular.copy($scope.editing[index]);
          //   $scope.editing[index] = false;
          // }



          // element.bind('keypress', function (e) {
  
//         if (e.target.nodeName.toLowerCase() != 'input') return;

//         var keyCode = (window.event) ? e.keyCode : e.which;

//         if (keyCode === 13) {
          
      //   }
      // });


//         var timeout = null;
  //         var debounceSaveUpdates = function(newVal, oldVal) {
  //   if (newVal != oldVal) {
  //     if (timeout) {
  //       $timeout.cancel(timeout)
  //     }
  //     timeout = $timeout(update, 1000);  // 1000 = 1 second
  //   }
  // };
  // $scope.$watch('blog.title', debounceSaveUpdates)
  // $scope.$watch('blog.content', debounceSaveUpdates)

  
//           $scope.editing = [];
//           $scope.blogs = Blogs.query();
// $scope.update = function(index){
//             var blog = $scope.blogs[$scope.blog._id];
//             Blogs.update({id: $scope.blog._id}, blog);
//             $scope.editing[$scope.blog._id] = false;
//           }

//           $scope.edit = function(index){
//             $scope.editing[$scope.blog._id] = angular.copy($scope.blogs[$scope.blog._id]);
//           }

//           $scope.cancel = function(index){
//             $scope.blogs[$scope.blog._id] = angular.copy($scope.editing[$scope.blog._id]);
//             $scope.editing[$scope.blog._id] = false;
//           }