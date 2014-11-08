angular.module('deezerPlayer.services', [])
    .factory('dz', function () {
        var dz = DZ;

        return {
            init: function (readyFunction) {
                dz.init({
                    appId: '1',
                    channelUrl: 'http://developers.deezer.com/examples/channel.php',
                    player: {
                        onload: readyFunction
                    }
                });
            },
            player: dz.player,
            api: dz.api,
            event: dz.Event
        };
    });
