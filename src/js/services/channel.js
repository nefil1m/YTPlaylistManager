angular
  .module('YTPlaylistManager')
  .service('channel', function() {
    var data = {
      basicInfo: {
        authorized: false
      },
      options: {
        autologin: false,
        autoplay: false,
        videoQuality: 'hd720'
      },
      activePlaylist: null,
      activeVideoIndex: 1,
      playlists: [],
      mockPlaylist: {
        snippet: {
          title: 'Sample Playlist',
          thumbnails: {
            medium: {
              url: 'assets/img/noth.png'
            }
          }
        },
        videos: [{
          id: 'o3mP3mJDL2k',
          snippet: {
            title: 'Shakira - Can\'t Remember to Forget You ft. Rihanna'
          }
        }, {
          id: 'tuMgJrFoAFY',
          snippet: {
            title: 'Ten Walls - Walking With Elephants [Official Video]'
          }
        }, {
          id: 'ESXgJ9-H-2U',
          snippet: {
            title: 'Kiesza - Hideaway (Official Video)'
          }
        }, {
          id: 'SYM-RJwSGQ8',
          snippet: {
            title: 'Tove Lo - Habits (Stay High) - Hippie Sabotage Remix'
          }
        }, {
          id: '81EdENK_9qQ',
          snippet: {
            title: 'SPADA & ELEN LEVON - Cool Enough (Official Video)'
          }
        }, {
          id: 'L8eRzOYhLuw',
          snippet: {
            title: 'Ariana Grande - Break Free ft. Zedd'
          }
        }, {
          id: 'gCYcHz2k5x0',
          snippet: {
            title: 'Martin Garrix - Animals (Official Video)'
          }
        }]
      }
    };

    return data;
  });