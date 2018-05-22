module.exports = class ConfigModel extends AbstractModel {

	constructor() {
		super();
		this.loadConfig();
		this.md5 = require("md5");
	}

	addJiraMonitor(data) {
		if(data.name && data.host && data.monitorType == "Jira") {
			if(!this._config.monitors) {
				this._config.monitors = {};
			}
			if(!this._config.monitors.jira) {
				this._config.monitors.jira = [];
			}
			data.createTime = new Date().getTime();
			data.id = this.md5(JSON.stringify(data));
			this._config.monitors.jira.push(data);
			this.saveConfig();
		} else {
			sup.handleError({type: "Invalid Input Data", data: data});
		}
	}
	addMonitor(data) {
		if(data.monitorType == "Jira") {
			return this.addJiraMonitor(data);
		} else if(data.monitorType == "Rest Service") {
			return this.addServiceMonitor(data);
		} else if(data.monitorType == "Website") {
			return this.addWebsiteMonitor(data);
		}
		sup.handleError({type: "Invalid Input Data", data: data, id: "ConfigModel.addMonitor"});
		return false;
	}
	addServiceMonitor(data) {
		if(data.name && data.url && data.monitorType == "Rest Service") {
			if(!this._config.monitors) {
				this._config.monitors = {};
			}
			if(!this._config.monitors.service) {
				this._config.monitors.service = [];
			} 
			data.createTime = new Date().getTime();
			data.id = this.md5(JSON.stringify(data));
			this._config.monitors.service.push(data);
			this.saveConfig();
		} else {
			sup.handleError({type: "Invalid Input Data", data: data});
		}
	}
	addWebsiteMonitor(data) {
		if(data.name && data.url && data.monitorType == "Website") {
			if(!this._config.monitors) {
				this._config.monitors = {};
			}
			if(!this._config.monitors.website) {
				this._config.monitors.website = [];
			}
			data.createTime = new Date().getTime();
			data.id = this.md5(JSON.stringify(data));
			this._config.monitors.website.push(data);
			this.saveConfig();
		} else {
			sup.handleError({type: "Invalid Input Data", data: data, id: "ConfigModel.addWebsiteMonitor"});
		}
	}
	loadConfig() {
		var path = __dirname.split("custom_modules/models")[0] + "working_files/config.json";
		this.fs.readJson(path, function(err, data) {
			if(err) {
				this._config = {};
				this.saveConfig();
			} else {
				this._config = data;
			}
			this.dispatchEvent("data", this._strip(this._config));
		}.bind(this));
	}
	getConfig() {
		return this._strip(this._config);
	}
	saveConfig() {
		var path = __dirname.split("custom_modules/models")[0] + "working_files/config.json";
		this.fs.outputJsonSync(path, this._strip(this._config), { spaces: '\t' });
		this.dispatchEvent("data", this._strip(this._config));
	}
}