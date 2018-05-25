module.exports = class SupController extends EventEmitter {

	constructor(controllers, models) {
		super();
		this.jiraMonitorController = controllers.jiraMonitorController;
		this.serviceMonitorController = controllers.serviceMonitorController;
		this.websiteMonitorController = controllers.websiteMonitorController;
		this.soapMonitorController = controllers.soapMonitorController;
		this.jiraMonitorController.subscribe("status", this.handleJiraStatusData.bind(this));
		this.serviceMonitorController.subscribe("status", this.handleServiceStatusData.bind(this));
		this.websiteMonitorController.subscribe("status", this.handleWebsiteStatusData.bind(this));
		this.soapMonitorController.subscribe("status", this.handleSoapStatusData.bind(this));
		this.viewController = controllers.viewController;
		this.configModel = models.configModel;
		this.configModel.subscribe("data", this.handleConfigData.bind(this));
		this.cookieModel = models.cookieModel;
		this.monitorHistoryModel = models.monitorHistoryModel;
		this.monitorHistoryModel.subscribe("data", this.handleMonitorHistoryUpdate);
		this.projectsModel = models.projectsModel;
		this.settingsModel = models.settingsModel;
		this._controllers = controllers;
		this._models = models;
		this._jiraStatus = {};
		this._serviceStatus = {};
		this._websiteStatus = {};
		this._soapStatus = {};
		/*
		var request = require('request');

		request.post('https://helpdesk.lifeplus.com:8443/rest/auth/1/session', {form: {
			username: 'Satori.Canton',
			password: 'ie7w2sp*2xkde'
		}}, (err, httpResponse, body) => {
			this.handleError(err);
			console.log("httpResponse", httpResponse);
			if(httpResponse.headers && httpResponse.headers['set-cookie']) {
				if(httpResponse.headers['set-cookie'].length) {
					var l = httpResponse.headers['set-cookie'].length;
					while(l--) {
						var c = httpResponse.headers['set-cookie'][l].split(";")[0].split("=");
						this.setCookie(c[0], c[1]);
					}
				}
			}
		});
		*/
	}

	addMonitor(details) {
		this.configModel.addMonitor(details);
	}
	handleConfigData(data) {
		if(data && data.monitors) {
			this.jiraMonitorController.setMonitors(data.monitors.jira);
			this.serviceMonitorController.setMonitors(data.monitors.service);
			this.websiteMonitorController.setMonitors(data.monitors.website);
			this.soapMonitorController.setMonitors(data.monitors.soap);
		}
		this._call("monitor-list", "setMonitors", data);
	}
	handleJiraStatusData(data) {
		this._jiraStatus = data;
		this._call("monitor-list", "setStatus", {jiraStatus: data, serviceStatus: this._serviceStatus, websiteStatus: this._websiteStatus, soapStatus: this._soapStatus});
	}
	handleMonitorHistoryUpdate(data) {
		console.log(data);
	}
	handleServiceStatusData(data) {
		this._serviceStatus = data;
		this._call("monitor-list", "setStatus", {jiraStatus: this._jiraStatus, serviceStatus: data, websiteStatus: this._websiteStatus, soapStatus: this._soapStatus});
	}
	handleWebsiteStatusData(data) {
		this._websiteStatus = data;
		this._call("monitor-list", "setStatus", {jiraStatus: this._jiraStatus, serviceStatus: this._serviceStatus, websiteStatus: data, soapStatus: this._soapStatus});
	}
	handleSoapStatusData(data) {
		this._soapStatus = data;
		this._call("monitor-list", "setStatus", {jiraStatus: this._jiraStatus, serviceStatus: this._serviceStatus, websiteStatus: this._websiteStatus, soapStatus: data});
	}
	handleError(err) {
		if(err) {
			console.error(err);
		}
	}
	playSlideshow() {
		console.log("Play Slideshow");
	}
	setCookie(name, value) {
		console.log(name + ": " + value);
	}
	toggleSettings() {
		this._call("dashboard", "toggleSettings");
	}

	_call(views, method, params) {
		if(this.viewController) {
			return this.viewController.callViewMethod(views, method, params);
		}
	}
}