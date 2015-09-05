angular
  .module('YTPlaylistManager')
  .controller('playlistCtrl', function($q, $scope, $rootScope, $interval, $timeout, YTResourceProvider, channel) {
    $scope.playlists = [channel.mockPlaylist];

    $scope.togglePlaylist = function($e, $index) {
      var playlist = angular.element($e.currentTarget.parentNode.parentNode);
      var previouslyOpened = angular.element(document.querySelector('.playlist.opened'));

      if(!playlist.hasClass('opened')) {
        if(previouslyOpened.length) {
          $scope.closePlaylist(previouslyOpened);

          $timeout(function() {
            $scope.openPlaylist(playlist);
          }, 500);
        } else {
          $scope.openPlaylist(playlist);
        }
      }

      if(channel.playlists[$index] && !channel.playlists[$index].videos) {
        $scope.getPlaylistItems(channel.playlists[$index]);
      }
    };



    $scope.openPlaylist = function($e) {
      var playlistBox;

      if($e.currentTarget) {
        playlistBox = angular.element($e.currentTarget.parentNode.parentNode);
      } else {
        playlistBox = $e;
      }

      $rootScope.openedPlaylist = true;
      playlistBox.addClass('opening');

      $timeout(function() {
        playlistBox.removeClass('opening').addClass('opened');
      }, 500);
    };



    $scope.closePlaylist = function($e) {
      var playlistBox;

      if($e.currentTarget) {
        playlistBox = angular.element($e.currentTarget.parentNode.parentNode);
      } else {
        playlistBox = $e;
      }

      playlistBox.addClass('closing');

      $rootScope.openedPlaylist = false;

      $timeout(function() {
        playlistBox.removeClass('opened');

        $timeout(function() {
          playlistBox.removeClass('closing');
        }, 1000);
      }, 500);
    };



    $scope.getPlaylists = function() {
      console.log('fetching')
      var options = {
        channelId: channel.basicInfo.userId,
        part: 'snippet,contentDetails,status',
        pageToken: channel.nextPlaylistsToken,
        maxResults: 8
      };

      YTResourceProvider.sendRequest('playlists.list', options)
        .then(function(response) {
          channel.nextPlaylistsToken = response.nextPageToken;
          channel.playlists = channel.playlists.concat(response.result.items);
          $scope.playlists = channel.playlists;
          // console.log(response);
        });
    };



    $scope.getPlaylistItems = function(playlist) {
      var options = {
        playlistId: playlist.id,
        part: 'id,snippet',
        maxResults: 50,
        pageToken: playlist.nextPageToken || null
      };

      YTResourceProvider.sendRequest('playlistItems.list', options)
        .then(function(response) {
          if(!playlist.videos) {
            playlist.videos = [];
          }

          playlist.itemCount = response.result.pageInfo.totalResults;

          return response.result.items;
        }).then(function(playlistItems) {
          var promises = [];
          // var collector = [];

          playlistItems.forEach(function(item, index) {
            var promise = $scope.getPlaylistItemDetails(item.snippet.resourceId.videoId);
            promises.push(promise);

            item.playlistItemId = item.id;
          });

          $q.all(promises).then(function(videos) {
            // console.log('args', arguments)
            // var fetchedData = Array.prototype.slice.call([], arguments[0]);
            // console.log('promises', promises, 'collector', collector)
            // $scope.$apply(function() {
              playlist.videos = playlist.videos.concat(videos);
            // });
            // console.log('success', videos, playlist)
          });
        });
    };



    $scope.getPlaylistItemDetails = function(videoId) {
      var promise = $q.defer();
      var options = {
        part: 'contentDetails,snippet,statistics',
        id: videoId
      };

      YTResourceProvider.sendRequest('videos.list', options)
        .then(function(response) {
          // var video = angular.merge({}, item, );
          // collector[index] = video;
          // console.log('inside', collector);
          promise.resolve(response.result.items[0]);
        }, function(error) {
          promise.reject(error);
        });

      return promise;
    };


    $scope.$on('loggedIn', $scope.getPlaylists);
  });
