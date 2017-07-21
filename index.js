var Alexa = require('alexa-sdk');
const APP_ID = 'amzn1.ask.skill.8176348c-42de-4356-b821-7d79f6039af6';

var states = {
    MAINMENU: '_MAINMENU', 
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(newSessionHandlers, mainMenuHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    'NewSession': function () {
        this.handler.state = states.MAINMENU;
        this.emit(':ask', strings.WELCOME_TEXT);
    },

    'SessionEndedRequest': function () {
        this.emit(':tell', strings.GOODBYE);
    },

    'Unhandled': function() {
        this.emit('NewSession');
    }
};

var mainMenuHandlers = Alexa.CreateStateHandler(states.MAINMENU, {
    'CheckIsExpired': function() {
        this.emit(':tell', "Yes it's expired");
    },

    'Unhandled': function() {
        this.emit(':tell', "I don't know");
    }
});

var strings = {
    // Welcome Strings
    WELCOME_TEXT: 'Ask me if something is expired',
    GOODBYE: 'Goodbye!'
};
