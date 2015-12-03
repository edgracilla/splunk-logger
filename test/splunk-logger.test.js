'use strict';

var cp     = require('child_process'),
	assert = require('assert'),
	logger;

describe('Logger', function () {
	this.slow(5000);

	after('terminate child process', function () {
        setTimeout(function(){
            logger.kill('SIGKILL');
        }, 5000);
	});

	describe('#spawn', function () {
		it('should spawn a child process', function () {
			assert.ok(logger = cp.fork(process.cwd()), 'Child process not spawned.');
		});
	});

	describe('#handShake', function () {
		it('should notify the parent process when ready within 5 seconds', function (done) {
			this.timeout(5000);

			logger.on('message', function (message) {
				if (message.type === 'ready')
					done();
			});

			logger.send({
				type: 'ready',
				data: {
					options: {
						url : '',
                        token: ''
					}
				}
			}, function (error) {
				assert.ifError(error);
			});
		});
	});

	describe('#log', function () {
		it('should process String log data', function (done) {
			logger.send({
				type: 'log',
				data: JSON.stringify({
					title: 'String data',
					data: 'Sample String Log Data'
				})
			}, done);
		});
	});

	describe('#log', function () {
		it('should process JSON log data', function (done) {
			logger.send({
				title: 'JSON data',
				data: 'Sample JSON Log Data'
			}, done);
		});
	});
});