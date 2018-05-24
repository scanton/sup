module.exports = class SettingsModel extends AbstractModel {

	constructor() {
		super();
		this.loadSettings();
	}
	loadSettings() {
		var path = __dirname.split("custom_modules/models")[0] + "working_files/settings.json";
		this.fs.readJson(path, function(err, data) {
			if(err) {
				this._settings = { };
				this._saveSettings();
			} else {
				this._settings = data;
			}
			this.dispatchEvent("settings", this._strip(this._settings));
		}.bind(this));
	}
	getSettings() {
		return this._strip(this._settings);
	}

	_saveSettings() {
		var path = __dirname.split("custom_modules/models")[0] + "working_files/settings.json";
		this.fs.outputJson(path, this._strip(this._settings), { spaces: '\t' }, function(err) {
			if(err) {
				controller.handleError(err);
			}
		});
		this.dispatchEvent("settings", this._strip(this._settings));
	}
}