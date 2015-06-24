angular
  .module('YTPlaylistManager')
  .service('YTResourceProvider', function($q, $config) {
    var YTResourceProvider = {};

    YTResourceProvider.login = function() {
      var def = $q.defer();

      gapi.client.setApiKey = $config.API_KEY;
      gapi.auth.authorize({
        client_id: $config.CLIENT_ID,
        scope: $config.SCOPE,
        immediate: true
      }, function() {
        gapi.client.load('youtube', 'v3', function() {
          var request = gapi.client.youtube.channels.list({
            mine: true,
            part: 'id, snippet, brandingSettings'
          });

          request.execute(function(response) {
            if(response.error) {
              def.reject(response.error);
            } else {
              def.resolve(response);
            }
          });
        });
      });

      return def.promise;
    };

    // YTResourceProvider.logout = function() {
    //   gapi.auth.signOut();
    // };

    return YTResourceProvider;
  });