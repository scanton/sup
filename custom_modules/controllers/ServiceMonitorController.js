module.exports = class ServiceMonitorController extends AbstractMonitorController {

	constructor(historyModel) {
		super();
		this.historyModel = historyModel;
		this.request = require('request');
	}
	_checkMonitor(detail, callback) {
		if(detail.url) {
			var requestDetails = { url: detail.url }
			var requestTime = new Date().getTime();
			if(detail.headers && detail.headers.length) {
				var headers = {};
				for(var h in detail.headers) {
					headers[detail.headers[h].name] = detail.headers[h].value;
				}
				requestDetails.headers = headers;
			}
			if(detail.body && detail.body.length) {
				var body = {};
				for(var b in detail.body) {
					body[detail.body[b].name] = detail.body[b].value;
				}
				requestDetails.body = body;
			}
			if(detail.verb == "GET") {
				this.request(requestDetails, (error, response, html) => {
					if(html) {
						var result = JSON.parse(html);
					}
					var responseTime = new Date().getTime();
					if(this.historyModel) {
						this.historyModel.recordPing(detail, responseTime - requestTime);
					}
					var passedTest = false;
					if(detail.assertion == "Array Longer Than") {
						passedTest = result && result.length && result.length > Number(detail.expectation);
					} else if(detail.assertion == "Equals") {
						passedTest = result && result[detail.query] == Number(detail.expectation);
					} else {
						passedTest = !error;
					}
					callback(detail.id, {passedTest: passedTest, responseTime: responseTime - requestTime});
				});
			} else {
				console.log("need to implement " + detail.verb + " in ServiceMonitorController");
			}
		}
	}
}