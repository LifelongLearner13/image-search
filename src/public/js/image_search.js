var app = angular.module('imageSearch', []);

app.controller('MainCtrl', function($scope, $http) {
    $scope.imageSearch = function(query) {
      query = query.trim().split(' ').join('+');
      var apiBase = document.location.href + 'api/search/';
      $http.get(apiBase + query).then(function(res) {
          $scope.images = res.data.photos.photo;
        }).catch(function(err) {
          $scope.error = err;
        });
    };
});