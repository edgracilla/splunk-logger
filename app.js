'use strict';

var platform = require('./platform'),
    isEmpty = require('lodash.isempty'),
	splunkClient;

platform.on('log', function (logData) {
    if(isEmpty(logData))
        platform.handleException(new Error(`Invalid data received. Data must not be empty.`));
    else{
        splunkClient.send({message: logData}, function(error, response, body){
            if(error){
                console.error(error);
                platform.handleException(error);
            }
        });
    }
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    var Splunk = require('splunk-logging').Logger;
    splunkClient = new Splunk({token: options.token, url: options.url});

	platform.notifyReady();
});