angular
  .module('YTPlaylistManager')
  .controller('mainCtrl', function($scope, channel) {

    $scope.$on('loggedIn', function() {
      $scope.info = channel.basicInfo;
      $scope.options = channel.options;
    });
  });

