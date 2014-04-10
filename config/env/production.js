'use strict';

module.exports = {
    db: 'mongodb://rias:Superpritt7217@oceanic.mongohq.com:10067/gymwithmusic',
    app: {
        name: 'GymWithMusic'
    },
    facebook: {
        clientID: '221610951296607',
        clientSecret: '20d5850ef7627e6f99a79b24610c91bc',
        callbackURL: 'http://gymwithmusic.herokuapp.com/auth/facebook/callback'
    },
    twitter: {
        clientID: '1ppOUZaqZsLllfEEODACpKW5Z',
        clientSecret: 'EFdn3MZstZftXZWCMGmltYH452dgxiOyfZBoAzRxhOomKk8NFp',
        callbackURL: 'http://gymwithmusic.herokuapp.com/auth/twitter/callback'
    },
    github: {
        clientID: 'APP_ID',
        clientSecret: 'APP_SECRET',
        callbackURL: 'http://gymwithmusic.herokuapp.com/auth/github/callback'
    },
    google: {
        clientID: '280257166673-5rsdlga81l7aoc8gi39vo002rq8jr4h3.apps.googleusercontent.com',
        clientSecret: 't9xw8-N7x9gVCI6JAtnM2enI',
        callbackURL: 'http://gymwithmusic.herokuapp.com/auth/google/callback'
    },
    linkedin: {
        clientID: 'API_KEY',
        clientSecret: 'SECRET_KEY',
        callbackURL: 'http://gymwithmusic.herokuapp.com/auth/linkedin/callback'
    }
};
