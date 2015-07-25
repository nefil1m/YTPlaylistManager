angular
  .module('YTPlaylistManager')
  .run(function($rootScope, YTResourceProvider, channel) {
    $(window).load(function() {
      var localOptions;

      $rootScope.$broadcast('pageLoaded');

      if(localStorage.options) {
        localOptions = JSON.parse(localStorage.options);
      }

      if(localOptions) {
        channel.options = localOptions;
      } else {
        localOptions = channel.options;
      }

      if(localOptions.autologin) {
        YTResourceProvider.login()
          .then(function(response) {
            var res = response.result.items[0];

            channel.basicInfo = {
              authorized: true,
              userId: res.id,
              username: res.snippet.title,
              profilePic: res.snippet.thumbnails.default.url,
              bgPic: res.brandingSettings.image.bannerMobileImageUrl
            };

            $rootScope.$broadcast('loggedIn');
            $('.preloader-wrapper').fadeOut();
          });
      } else {
        $('.preloader-wrapper').fadeOut();
      }
    });
  });