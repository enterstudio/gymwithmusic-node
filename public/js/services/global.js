'use strict';

//Global service for global variables
angular.module('gymwithmusic.system').factory('Global', [
    function() {
        var _this = this;
        _this._data = {
            user: window.user,
            authenticated: !! window.user
        };

        return _this._data;
    }
]);


var FayeServerURL = '/socket';

// Simple Faye service
angular.module('gymwithmusic.system').factory('Faye', function() {
  var client = new window.Faye.Client(FayeServerURL);

  return {
    publish: function(channel, message) {
      client.publish(channel, message);
    },

    subscribe: function(channel, callback) {
      client.subscribe(channel, callback);
    }
  };
});
