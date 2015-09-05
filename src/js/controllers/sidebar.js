angular
  .module('YTPlaylistManager')
  .controller('sidebarCtrl', function($rootScope, $scope, channel, YTResourceProvider, $mdToast, $mdSidenav, $mdDialog) {
    $scope.settingsIcon = "expand_more";
    $scope.settingsOpened = false;

    $scope.login = function() {
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

          $scope.info = channel.basicInfo;
          $rootScope.$broadcast('loggedIn');
        }, function(response) {
          $mdToast.show(
            $mdToast.simple()
              .content(response.error.code + " " + response.error.message)
              .highlightAction(false)
              .position({top: true, right: true})
          );
        });
    };

    $scope.toggleSidenav = function() {
      $mdSidenav('sidenav').toggle();
    };

    $scope.showAbout = function(e) {
      $mdDialog.show({
        controller: 'aboutModalCtrl',
        templateUrl: 'assets/templates/about.modal.html',
        parent: angular.element(document.body),
        targetEvent: e.target
      });
    };

    $scope.toggleSettings = function() {
      $scope.settingsIcon = $scope.settingsIcon === 'expand_more' ? 'expand_less' : 'expand_more';
      $scope.settingsOpened = !$scope.settingsOpened;
    };

    $scope.saveSettings = function() {
      localStorage.options = JSON.stringify($scope.options);
    };

    // $scope.logout = function() {
    //   YTResourceProvider.logout()
    // };
  });
