'use strict';

var index = require('../controllers/index');

module.exports = function(app) {
    
    // Home route
    app.get('*', index.render);
};
