'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;


/**
 * SkipVote Schema
 */
var SkipVoteSchema = new Schema({
    voters: {
        type: Array,
        default: [] 
    }
});

mongoose.model('SkipVote', SkipVoteSchema);
