angular
  .module('YTPlaylistManager')
  .controller('playlistCtrl', function($scope, $timeout) {
    $scope.togglePlaylist = function($e) {
      var playlist = angular.element($e.currentTarget.parentNode.parentNode);
      var previouslyOpened = angular.element(document.querySelector('.playlist.opened'));

      if(previouslyOpened.length) {
        previouslyOpened.addClass('closing');
        $timeout(function() {
          previouslyOpened.removeClass('opened').removeClass('closing');
        }, 500);
      } else {
        playlist.addClass('opening')
        $timeout(function() {
          playlist.removeClass('opening').addClass('opened');
        }, 500);
      }
    };
  });