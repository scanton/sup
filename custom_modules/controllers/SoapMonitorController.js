module.exports = class SoapMonitorController extends AbstractMonitorController {

	constructor(historyModel) {
		super();
		this.historyModel = historyModel;
		this.request = require('request');
	}
	_checkMonitor(detail, callback) {
		if(detail.url) {
			var requestTime = new Date().getTime();
			this.request(detail.url, (error, response, html) => {
				var responseTime = new Date().getTime();
				if(this.historyModel) {
					this.historyModel.recordPing(detail, responseTime - requestTime);
				}
				var passedTest = !error;
				callback(detail.id, {passedTest: passedTest, responseTime: responseTime - requestTime});
			});
			
		}
	}
}