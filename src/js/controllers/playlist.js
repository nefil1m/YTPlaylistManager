angular
  .module('YTPlaylistManager')
  .controller('playlistCtrl', function($scope, $timeout, YTResourceProvider, channel) {

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

    $scope.getPlaylists = function() {
      var options = {
        channelId: channel.basicInfo.userId,
        part: 'snippet,contentDetails,status'
      };

      YTResourceProvider.sendRequest('playlists.list', options)
        .then(function(response) {
          channel.playlists.concat(response.result.items);
          $scope.playlists = channel.playlists;
          console.log(response)
        });
    };

    $scope.$on('loggedIn', $scope.getPlaylists);
  });