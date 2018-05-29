module.exports = class MonitorHistoryModel extends AbstractModel {

	constructor() {
		super();
		this._cache = {};
	}
	getHistory(id) {
		if(this._cache[id]) {
			return this._strip(this._cache[id]);
		}
	}
	recordPing(monitor, pingTime) {
		if(monitor && monitor.id && pingTime) {
			var history = [];
			var path = __dirname.split("custom_modules/models")[0] + "working_files/ping_history/history_" + monitor.id + ".json";
			this.fs.readJson(path, function(err, data) {
				if(err) {
					console.log("creating history file for " + monitor.name);
				} else {
					history = data;
				}
				history.push(pingTime);
				while(history.length > 500) {
					history.shift();
				}
				this.fs.outputJsonSync(path, history);
				this._cache[monitor.id] = history;
				this.dispatchEvent("data", this._strip({name: monitor.name, id: monitor.id, history: history}));
			}.bind(this));
		}
	}
}