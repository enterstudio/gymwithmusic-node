// https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&order=viewCount&q=One+Republic&type=video&videoCategoryId=10&videoEmbeddable=true&key=AIzaSyDbhofgKeHR6BvGATtxqGv1WIJMSaCl5sM
'use strict';

angular.module('gymwithmusic.system').controller('VideoController', ['$scope', 'Global', '$location', '$http', 'Faye', function ($scope, Global, $location, $http, Faye) {
    $scope.global = Global;
    Faye.subscribe('/videos', function(videos){
      console.log(videos);
    });

    $scope.addByUrl = function(url){        
        
        // check of de url een standaard yt link is
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[2].length==11){
            var id = match[2];

            $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+id+'&key=AIzaSyDbhofgKeHR6BvGATtxqGv1WIJMSaCl5sM').
              success(function(data, status, headers, config) {

                var title = data.items[0].snippet.title;
                var thumbnail = data.items[0].snippet.thumbnails.high.url;

                var video = {
                  title: title,
                  url: url,
                  youtube_id: id,
                  thumbnail: thumbnail,
                  added_by: Global.user._id
                }

                $http.post('/videos', video).
                  success(function(data, status, headers, config) {
                    if(data.status == "success")
                    {
                      $scope.global.messages.push({ type: 'success', msg: "Je video is toegevoegd" });
                      Faye.publish('/videos', data.message);
                    }
                    else
                    {
                      $scope.global.messages.push({ type: 'danger', msg: data.message });
                    }
                  }).
                  error(function(data, status, headers, config) {
                    $scope.global.messages.push({ type: 'danger', msg: 'Oeps! De video werd gevonden maar er liep iets fout bij ons. Probeer opnieuw?' });
                  });
              }).
              error(function(data, status, headers, config) {
                $scope.global.messages.push({ type: 'danger', msg: 'Oeps! YouTube kon geen video vinden, probeer opnieuw?' });
              });








            



        }else{
            $scope.global.messages.push({ type: 'danger', msg: 'Oeps! Foutje in de url. YouTube staat enkel de standaard url toe: http://www.youtube.com/watch?v=VIDEO_ID.' });
        }
    }
}]);
