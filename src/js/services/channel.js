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
        itemCount: 7,
        snippet: {
          title: 'Hello there!',
          description: 'This is just hardcoded sample playlist. To fully enjoy this application login with your YouTube account.',
          thumbnails: {
            high: {
              url: 'assets/img/noth.png'
            }
          }
        },
        videos: [{
          id: 'o3mP3mJDL2k',
          snippet: {
            title: 'Shakira - Can\'t Remember to Forget You ft. Rihanna',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/o3mP3mJDL2k/mqdefault.jpg'
              }
            }
          }
        }, {
          id: 'tuMgJrFoAFY',
          snippet: {
            title: 'Ten Walls - Walking With Elephants [Official Video]',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/tuMgJrFoAFY/mqdefault.jpg'
              }
            }
          }
        }, {
          id: 'ESXgJ9-H-2U',
          snippet: {
            title: 'Kiesza - Hideaway (Official Video)',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/ESXgJ9-H-2U/mqdefault.jpg'
              }
            }
          }
        }, {
          id: 'SYM-RJwSGQ8',
          snippet: {
            title: 'Tove Lo - Habits (Stay High) - Hippie Sabotage Remix',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/SYM-RJwSGQ8/mqdefault.jpg'
              }
            }
          }
        }, {
          id: '81EdENK_9qQ',
          snippet: {
            title: 'SPADA & ELEN LEVON - Cool Enough (Official Video)',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/81EdENK_9qQ/mqdefault.jpg'
              }
            }
          }
        }, {
          id: 'L8eRzOYhLuw',
          snippet: {
            title: 'Ariana Grande - Break Free ft. Zedd',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/L8eRzOYhLuw/mqdefault.jpg'
              }
            }
          }
        }, {
          id: 'gCYcHz2k5x0',
          snippet: {
            title: 'Martin Garrix - Animals (Official Video)',
            thumbnails: {
              'default': {
                url: '//i.ytimg.com/vi/gCYcHz2k5x0/mqdefault.jpg'
              }
            }
          }
        }]
      }
    };

    return data;
  });
