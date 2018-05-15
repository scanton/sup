module.exports = class ConfigModel extends AbstractModel {

	constructor() {
		super();
		this.loadConfig();
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