var Alexa = require('alexa-sdk');
var Speech = require('ssml-builder');

const APP_ID = 'amzn1.ask.skill.8176348c-42de-4356-b821-7d79f6039af6';



var states = {
    MAIN: '_MAIN',
};

exports.handler = function(event, context, callback){
    var alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(newSessionHandlers, mainHandlers);
    alexa.execute();
};

var newSessionHandlers = {
    'NewSession': function () {
        this.handler.state = states.MAIN;
        this.emit(':ask', "Welcome to Alexa a la Ramsay");
    },

    'SessionEndedRequest': function () {
        var speech = new Speech();
        var randomInt = Math.floor(Math.random() * 10);
        speech.audio(getGoodbyeText());
        var speechOutput = speech.ssml(true);
        this.emit(':tell', speechOutput);
    },

    'Unhandled': function() {
        this.emit('NewSession');
    }
};

var mainHandlers = Alexa.CreateStateHandler(states.MAIN, {
    'GimmeRamsayAdviceIntent': function() {
        var speech = new Speech();
        var randomInt = Math.floor(Math.random() * 10);
        speech.audio(getInsultURLString(randomInt));
        var speechOutput = speech.ssml(true);
        this.emit(':ask', speechOutput);
    },

    'EncouragementIntent': function() {
        var speech = new Speech();
        var randomInt = Math.floor(Math.random() * 3);
        speech.audio(getEncouragementURLString(randomInt));
        var speechOutput = speech.ssml(true);
        this.emit(':ask', speechOutput);
    },

    'SessionEndedRequest': function () {
        var speech = new Speech();
        speech.audio(getGoodbyeText());
        var speechOutput = speech.ssml(true);
        this.emit(':tell', speechOutput);
    },

    'WhatCanISay': function () {
        this.emit(':ask', "You can ask, Ramsay, what do you think of my recipe, or, Gordon Ramsay, I need encouragement.");
    },

    'Unhandled': function() {
        this.emit(':ask', "Ramsay didn't understand your request. You can ask, Ramsay, what do you think of my recipe, or, Gordon Ramsay, I need encouragement.");
    }
});


function getInsultURLString(index, numEntries) {
    return 'https://s3-us-west-1.amazonaws.com/gordanramseyinsults/' + index.toString() + '.mp3';
}


function getEncouragementURLString(index) {

    return 'https://s3.us-east-2.amazonaws.com/gordanramseyencouragement/' + index.toString() + '.mp3';
}

function getGoodbyeText() {
    return 'https://s3-us-west-1.amazonaws.com/gordanramseyinsults/0.mp3';
}


