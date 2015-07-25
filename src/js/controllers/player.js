angular
  .module('YTPlaylistManager')
  .controller('playerCtrl', function($rootScope, $scope, $interval, channel) {
    $scope.playStatusIcon = 'play_arrow';
    $scope.volumeStatusIcon = 'volume_up';

    $scope.playPosition = '0%';
    $scope.playerVolume = 100;
    $scope.previousVolume = 100;
    $scope.playerState = -1;

    $scope.activePlaylist = channel.activePlaylist;
    $scope.activeVideoindex = channel.activeVideoindex;

    $scope.videoQuality = chooseVideoQuality();

    function chooseVideoQuality() {
      if(channel.authorized && channel.options.quality) {
        return channel.options.quality;
      }

      var width = screen.width;

      if(width >= 1920)                   return 'hd1080';
      if(width < 1920 && width >= 1280)   return 'hd720';
      if(width < 1280 && width >= 854)    return 'large';
      if(width < 854 && width >= 640)     return 'medium';
      if(width < 640)                     return 'small';
    }

    function stateChange(e) {
      if(e.data == 1) {
        $scope.playStatusIcon = 'pause';
      } else {
        $scope.playStatusIcon = 'play_arrow';
      }

      if(e.data == YT.PlayerState.BUFFERING) {
        e.target.setPlaybackQuality($scope.videoQuality);
      }

      $scope.currentVideoDuration = $scope.player.getDuration();
      $scope.playerState = e.data;
      $scope.$apply();
    }

    function changeVolumeIcon(vol) {
      if(vol === 0) {
        $scope.volumeStatusIcon = 'volume_off';
      } else if(vol > 0 && vol <= 33) {
        $scope.volumeStatusIcon = 'volume_mute';
      } else if(vol > 33 && vol <= 66) {
        $scope.volumeStatusIcon = 'volume_down';
      } else {
        $scope.volumeStatusIcon = 'volume_up';
      }
    }

    function setDefaultVars(e) {
      $scope.currentVideoDuration = $scope.player.getDuration();
      $scope.playerVolume = $scope.player.getVolume();
      e.target.setPlaybackQuality($scope.videoQuality);

      if(!channel.basicInfo.authorized) {
        channel.activePlaylist = channel.mockPlaylist;
        $scope.currentVideo = channel.activePlaylist.videos[channel.activeVideoIndex];
      }
    }

    $scope.playPauseVideo = function() {
      if($scope.playerState === 1) {
        $scope.player.pauseVideo();
      } else {
        $scope.player.playVideo();
      }
    };

    $scope.stopVideo = function() {
      $scope.player.seekTo(0);
      $scope.player.stopVideo();
    };

    $scope.muteVideo = function() {
      var volume = $scope.playerVolume !== 0 ? 0 : $scope.previousVolume;
      $scope.previousVolume = $scope.playerVolume;
      $scope.playerVolume = volume;
      $scope.player.setVolume(volume);
      changeVolumeIcon(volume);
    };

    $scope.adjustVolume = function() {
      $scope.player.setVolume($scope.playerVolume);
      changeVolumeIcon($scope.playerVolume);
    };

    $scope.init = function() {
      $scope.player = new YT.Player('player', {
        height: '100%',
        width: '100%',
        suggestedQuality: $scope.videoQuality,
        videoId: channel.mockPlaylist.videos[channel.activeVideoIndex].id,
        playerVars: {
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          iv_load_policy: 3
        },
        events: {
          'onStateChange': stateChange,
          'onReady': setDefaultVars
        }
      });
    };

    $scope.changePlayingPosition = function(e) {
      var elemLeft = $('.video-progress').offset().left;
      var desiredPosition = ((e.clientX - elemLeft) * 100 / 229).toFixed(4);
      var setTo = ($scope.currentVideoDuration * desiredPosition / 100).toFixed(2);

      $scope.playPosition = desiredPosition + '%';
      $scope.player.seekTo(setTo);
    };

    $scope.previousVideo = function() {
      channel.activeVideoIndex--;
      if(channel.activeVideoIndex < 0) {
        channel.activeVideoIndex = channel.activePlaylist.videos.length - 1;
      }
      $scope.currentVideo = channel.activePlaylist.videos[channel.activeVideoIndex];
      $scope.player.loadVideoById({
        videoId: $scope.currentVideo.id,
        suggestedQuality: $scope.videoQuality
      });
    };

    $scope.nextVideo = function() {
      channel.activeVideoIndex++;
      if(channel.activeVideoIndex >= channel.activePlaylist.videos.length) {
        channel.activeVideoIndex = 0;
      }
      $scope.currentVideo = channel.activePlaylist.videos[channel.activeVideoIndex];
      $scope.player.loadVideoById({
        videoId: $scope.currentVideo.id,
        suggestedQuality: $scope.videoQuality
      });
    };

    $interval(function() {
      if($scope.playerState === 1) {
        $scope.playPosition = $scope.player.getCurrentTime() * 100 / $scope.currentVideoDuration + '%';
      }
    }, 500);

    $scope.$on('pageLoaded', $scope.init);
    $scope.$on('loggedIn', function() {
      if(channel.options.autoplay) {
        $scope.player.playVideo();
      }
    });
  });
