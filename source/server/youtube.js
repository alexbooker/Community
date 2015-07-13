'use strict';

var request = require('request');

function Youtube(key) {
  if (!(this instanceof Youtube)) {
    return new Youtube(key);
  }

  this.key = key;

  this.isYouTubeUrl = function (url) {
    return /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/.test(url);
  };

  var parseIdFromUrl = function (url) {
    var pattern = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(pattern);
    if (match && match[2].length === 11) {
      return match[2];
    }
  };

  this.fetchVideoDetails = function (url, callback) {
    var id = parseIdFromUrl(url);
    var apiUrl = 'https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=' + id + '&key=' + this.key;
    request(apiUrl, function (error, request, body) {
      if (error) { return callback(error); }
      var parsed = JSON.parse(body);
      var video = parsed.items[0];
      return callback(null, {
        screencastId: id,
        title: video.snippet.title,
        channel: {
          name: video.snippet.channelTitle,
       }
      });
    });
  };
}

module.exports = Youtube;