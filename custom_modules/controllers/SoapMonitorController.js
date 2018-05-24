module.exports = class SoapMonitorController extends AbstractMonitorController {

	constructor() {
		super();
		this.request = require('request');
	}
	_checkMonitor(detail, callback) {
		if(detail.url) {
			var requestTime = new Date().getTime();
			this.request(detail.url, (error, response, html) => {
				var responseTime = new Date().getTime();
				var passedTest = !error;
				callback(detail.id, {passedTest: passedTest, responseTime: responseTime - requestTime});
			});
			
		}
	}
}