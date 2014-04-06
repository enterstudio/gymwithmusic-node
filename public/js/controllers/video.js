'use strict';

angular.module('gymwithmusic.system').controller('VideoController', ['$scope', 'Global', '$location', '$http', 'Faye', function ($scope, Global, $location, $http, Faye) {
    $scope.global = Global;
    Faye.subscribe('/videos', function(videos){
      $scope.allVideos = videos;
    });

    $scope.addByUrl = function(url)
    {
        // check of de url een standaard yt link is
        var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match&&match[2].length===11){
            var id = match[2];

            this.addById(id);

        }else{
            $scope.global.messages.push({ type: 'danger', msg: 'Oeps! Foutje in de url. YouTube staat enkel de standaard url toe: http://www.youtube.com/watch?v=VIDEO_ID.' });
        }
    };

    $scope.autocomplete = function(terms) {
    return $http.jsonp('http://suggestqueries.google.com/complete/search?hl=en&ds=yt&client=youtube&hjson=t&cp=1&q='+terms+'&key=AIzaSyDbhofgKeHR6BvGATtxqGv1WIJMSaCl5sM&format=5&alt=json&callback=JSON_CALLBACK').then(function(response){
      var results = [];
      angular.forEach(response.data[1], function(item){
        results.push(item[0]);
      });
      return results;
    });
  };

    $scope.searchYoutube = function(terms)
    {
      $http.get('https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&order=viewCount&q='+terms+'&type=video&videoCategoryId=10&videoEmbeddable=true&key=AIzaSyDbhofgKeHR6BvGATtxqGv1WIJMSaCl5sM').
      success(function(data) {
        $scope.searchResults = data.items;
      }).
      error(function() {
        $scope.global.messages.push({ type: 'danger', msg: 'Oeps! Er is iets misgelopen bij YouTube, probeer nog eens?' });
      });
    };

    $scope.addById = function(id, $event)
    {
      $http.get('https://www.googleapis.com/youtube/v3/videos?part=snippet&id='+id+'&key=AIzaSyDbhofgKeHR6BvGATtxqGv1WIJMSaCl5sM').
      success(function(data) {

        var title = data.items[0].snippet.title;
        var thumbnail = data.items[0].snippet.thumbnails.high.url;

        var video = {
          title: title,
          url: 'http://www.youtube.com/watch?v=' + id,
          youtube_id: id,
          thumbnail: thumbnail,
          added_by: Global.user._id
        };

        $http.post('/videos', video).
          success(function(data) {
            if(data.status === 'success')
            {
              if($event)
              {
                angular.element($event.toElement).addClass('added');
              }
              $scope.global.messages.push({ type: 'success', msg: 'Je video is toegevoegd' });
              Faye.publish('/videos', data.message);
            }
            else
            {
              $scope.global.messages.push({ type: 'danger', msg: data.message });
              if($event)
              {
                angular.element($event.toElement).addClass('added');
              }
            }
          }).
          error(function() {
            $scope.global.messages.push({ type: 'danger', msg: 'Oeps! De video werd gevonden maar er liep iets fout bij ons. Probeer opnieuw?' });
          });
      }).
      error(function() {
        $scope.global.messages.push({ type: 'danger', msg: 'Oeps! YouTube kon geen video vinden, probeer opnieuw?' });
      });
    };
}]);
