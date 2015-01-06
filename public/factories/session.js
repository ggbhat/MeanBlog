

angular.module('userservice')
  .factory('Session', function ($resource) {
    return $resource('/auth/session/');
  });