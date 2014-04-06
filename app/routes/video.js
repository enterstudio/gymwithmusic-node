// User routes use users controller
var videos = require('../controllers/videos');

module.exports = function(app, passport) {

    app.post('/videos', videos.add);
    app.get('/videos', videos.list);
}
