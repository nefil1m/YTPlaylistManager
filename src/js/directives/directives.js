angular
  .module('YTPlaylistManager')

  .directive('draggableElem', function($document) {
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, elem, attrs) {
        var elemToDrag = $(attrs.draggableElem);

        elem.on('mousedown', function(e) {
          e.preventDefault();
          $document.on('mousemove', mousemove);
          $document.on('mouseup', mouseup);
        });

        function mousemove(e) {
          elemToDrag.css({
            'left': e.clientX,
            'top': e.clientY,
            'bottom': 'auto'
          });
        }

        function mouseup(e) {
          $document.off('mousemove', mousemove);
          $document.off('mouseup', mouseup);
        }
      }
    }
  })

  .directive('mainSidebar', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'assets/templates/sidebar.html',
      controller: 'sidebarCtrl'
    }
  })

  .directive('controlPanel', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'assets/templates/control.panel.html',
      controller: 'playerCtrl'
    }
  })

  .directive('playlist', function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'assets/templates/playlist.html',
      controller: 'playlistCtrl'
    }
  });