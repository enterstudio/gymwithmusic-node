'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Video = mongoose.model('Video');


/**
 * All videos
 */
exports.list = function(req, res) {
    Video.find().populate('added_by').exec(function(err, videos)
    {
        return res.send({
            status: 'success',
            videos: videos
        });
    });
};

/**
 * Create video
 */
exports.add = function(req, res) {
    var video = new Video(req.body);
    var message = '';
    video.save(function(err) {
        if (err) {
            switch (err.code) {
                case 11000:
                case 11001:
                    message = 'Video is al toegevoegd';
                    break;
                default:
                    message = 'Oeps! Er is iets misgelopen met de databank.';
            }

            return res.send({
                status: 'error',
                message: message
            });
        }
        Video.find().populate('added_by').exec(function(err, videos)
        {
            return res.send({
                status: 'success',
                message: videos
            });
        });
    });

};
