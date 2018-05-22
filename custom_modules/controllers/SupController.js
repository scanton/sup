module.exports = class SupController extends EventEmitter {

	constructor(controllers, models) {
		super();
		this.viewController = controllers.viewController;
		this.configModel = models.configModel;
		this.configModel.subscribe("data", this.handleConfigData.bind(this));
		this.cookieModel = models.cookieModel;
		this._controllers = controllers;
		this._models = models;

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

	setCookie(name, value) {
		console.log(name + ": " + value);
	}

	handleConfigData(data) {
		this._call("monitor-list", "setMonitors", data);
	}
	handleError(err) {
		if(err) {
			console.error(err);
		}
	}

	_call(views, method, params) {
		if(this.viewController) {
			return this.viewController.callViewMethod(views, method, params);
		}
	}
}