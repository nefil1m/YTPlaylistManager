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
            'left': e.clientX - 10,
            'top': e.clientY - 10,
            'bottom': 'auto',
            'right': 'auto'
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
  })

  .directive('lock', function() {
    return {
      restrict: 'A',
      replace: false,
      link: function(scope, elem, attrs) {
        var inputs = elem.find('input, textarea');

        elem.attr('readonly', true);

        $(elem).on('focus', function() {
          elem.attr('readonly', false);
        });

        $(elem).on('blur', function() {
          elem.attr('readonly', true);
        });
      }
    }
  });
