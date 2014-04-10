'use strict';

angular.module('gymwithmusic.system').controller('ScreenController', ['$scope', '$http', 'Global', 'Faye', '$youtube', function ($scope, $http, Global, Faye, $youtube) {
    $scope.global = Global;

    //Refresh when current video changes
    Faye.subscribe('/skipVotes', function(votes){
      var votes = votes;
      $scope.$apply(function() {
          $scope.skipVotes = votes;
      });

      if(votes.length >= 5)
      {
        newVideo();
        $scope.skipVotes = [];
        Faye.publish('/skipVotes', $scope.skipVotes);
      }
    });
    
    newVideo();

    function newVideo()
    {
      $http.get('/videos').
      success(function(data) {
        if(data.videos.length > 0){

          var currentVideo = data.videos[0];
          Global.currentVideo = currentVideo;

          var video = {
            _id: currentVideo._id,
            added_by: currentVideo.added_by._id,
            thumbnail: currentVideo.thumbnail,
            title: currentVideo.title,
            url: currentVideo.url,
            youtube_id: currentVideo.youtube_id
          }
        
          $http.post('/videos/current', video).
              success(function(data) {
                if(data.status === 'success')
                {
                  $youtube.playerId = 'best-vid';
                  $youtube.videoId = currentVideo.youtube_id;
                  $youtube.loadPlayer();
                  $scope.skipVotes = [];
                  Faye.publish('/currentVideo', currentVideo);
                  Faye.publish('/videos', data.message);
                  Faye.publish('/skipVotes', $scope.skipVotes);
                }
                else
                {
                  console.log(data.message);
                }
              }).
              error(function() {
                console.log("Unknown error");
              });
        }
        else
        {
          Global.currentVideo = {
              title: "Geen videos op dit moment, voeg er een toe!",
              added_by: {
                name: ''
              }
          };
          Faye.publish('/currentVideo', Global.currentVideo);
          Faye.subscribe('/videos', function(videos){
            if(!Global.currentVideo.youtube_id){
              $scope.$apply(function() {
                   newVideo();
              });
            }
          });
        }
        });
      }

      $scope.$on('youtube.player.ready', function () {
        $youtube.player.seekTo(0.5, true);
        $youtube.player.playVideo();
      });

      $scope.$on('youtube.player.ended', function () {
        newVideo();
      });

}]);
