'use strict';

// User routes use users controller
var videos = require('../controllers/videos');

module.exports = function(app) {

    app.get('/videos/current', videos.getCurrent);
    app.post('/videos/current', videos.addCurrent);
    app.get('/skipvotes', videos.getSkipVotes);
    app.post('/skipvotes', videos.addSkipVote);
    app.post('/videos', videos.add);
    app.get('/videos', videos.list);
    app.post('/videos/:id', videos.vote);
    app.delete('/videos/:id', videos.delete);
};
