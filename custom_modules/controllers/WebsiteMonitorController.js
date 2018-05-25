module.exports = class WebsiteMonitorController extends AbstractMonitorController {

	constructor(historyModel) {
		super();
		this.historyModel = historyModel;
		this.request = require('request');
		this.cheerio = require('cheerio');
	}
	_checkMonitor(detail, callback) {
		if(detail.url) {
			var requestTime = new Date().getTime();
			this.request(detail.url, (error, response, html) => {
				var responseTime = new Date().getTime();
				if(this.historyModel) {
					this.historyModel.recordPing(detail, responseTime - requestTime);
				}
				var $site = this.cheerio.load(html);
				var testValue = $site(detail.query).text();
				var passedTest = false;
				if(detail.assertion == "String Not Empty") {
					passedTest = Boolean(testValue.length);
				} else if(detail.assertion == "Not Null") {
					passedTest = Boolean(testValue);
				} else if(detail.assertion == "Less Than") {
					passedTest = Boolean(Number(testValue) < Number(detail.expectation));
				} else if(detail.assertion == "Greater Than") {
					passedTest = Boolean(Number(testValue) > Number(detail.expectation));
				} else if(detail.assertion == "Equals") {
					passedTest = Boolean(testValue == detail.expectation);
				}
				callback(detail.id, {passedTest: passedTest, responseTime: responseTime - requestTime});
			});
		}
	}
}