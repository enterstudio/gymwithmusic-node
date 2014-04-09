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
        default: '',
        unique: true
    },
    thumbnail: {
        type: String,
        default: ''
    },
    added_by: {
        type: Schema.ObjectId,
        ref: 'User'
    },
    vote_count: {
        type: Number,
        default: 0
    },
    voterIds: {
       type: Array,
       default: [] 
    },
    voterNames: {
       type: Array,
       default: [] 
    },
    voterEmails: {
       type: Array,
       default: [] 
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
