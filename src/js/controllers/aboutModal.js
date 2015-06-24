angular
  .module('YTPlaylistManager')
  .controller('aboutModalCtrl', function($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
  });