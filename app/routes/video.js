'use strict';

// User routes use users controller
var videos = require('../controllers/videos');

module.exports = function(app) {

    app.post('/videos', videos.add);
    app.get('/videos', videos.list);
};
