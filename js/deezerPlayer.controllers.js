angular.module('deezerPlayer.controllers', [])
    .controller('dzController', ['$scope', '$timeout', 'dz', function ($scope, $timeout, dz) {
        var l = function() {
            DZ.login(function(r){
                console.debug(r);
            }, {perms: 'basic_access,email'});
        };
        $scope.stations = [];
        $scope.playing = {};
        $scope.menuSelected = 'radio';

        $scope.menuSelect = function(menu) {
            $scope.menuSelected = menu;
        };

        var readyFunction = function () {
            console.log('player ready');
            dz.api('/radio', function(response){
                $scope.stations =  response.data;
                $scope.$apply();
            });

            dz.event.subscribe('current_track', function(arg){
                var id = arg.track.id;
                dz.api('/track/' + id, function(response){
                    console.log(response);
                    $scope.playing = {
                        album: response.album,
                        artist: response.artist,
                        song: response.title,
                        trackNumber: response.track_position
                    };

                    $scope.mediaBg = {
                        'background-image': 'url('+ response.artist.picture +')',
                        'background-position-y': '100%'
                    };
                    $scope.$apply();

                    $timeout(function(){
                        $scope.mediaBg['background-position-y'] = '0';
                        $scope.$apply();
                    }, 500);
                });
            });
            $scope.playRadio = function (station) {
                dz.player.playRadio(station.id);
            }
        };
        console.debug('initialising...');
        dz.init(readyFunction);

    }]);
