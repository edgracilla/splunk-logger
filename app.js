'use strict';

var platform = require('./platform'),
    isPlainObject = require('lodash.isplainobject'),
	splunkClient;

platform.on('log', function (logData) {
    if(!logData) return;

    if(isPlainObject(logData))
        logData = JSON.stringify(logData);

    splunkClient.send({message: logData}, function(error, response, body){
        if(error){
            console.error(error);
            platform.handleException(error);
        }
    });
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {
    var Splunk = require('splunk-logging').Logger;
    splunkClient = new Splunk({token: options.token, url: options.url});

	platform.notifyReady();
});