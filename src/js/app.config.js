angular
  .module('YTPlaylistManager')
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
      .accentPalette('red', {
        'default': '900'
      });
  });