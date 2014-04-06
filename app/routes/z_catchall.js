'use strict';

var index = require('../controllers/index');

module.exports = function(app, passport) {
    
    // Home route
    app.get('*', index.render);
};
