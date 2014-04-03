'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * Video Schema
 */
var VideoSchema = new Schema({
    added: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        default: '',
        trim: true
    },
    url: {
        type: String,
        default: ''
    },
    youtube_id: {
        type: String,
        default: ''
    },
    thumbnail: {
        type: String,
        default: ''
    },
    added_by: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Statics
 */
VideoSchema.statics.load = function(id, cb) {
    this.findOne({
        _id: id
    }).populate('user', 'name username').exec(cb);
};

mongoose.model('Video', VideoSchema);
