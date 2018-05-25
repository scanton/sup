module.exports = class AbstractMonitorController extends EventEmitter {

	constructor() {
		super();
		this._monitors = [];
		this._testInterval = 150000;
		this._status = {};
		this._hasMonitors = false;
	}
	checkMonitors() {
		if(this._monitors && this._monitors.length) {
			let l = this._monitors.length;
			while(l--) {
				this._checkMonitor(this._monitors[l], this.updateStatus.bind(this));
			}
		}
		clearTimeout(this._intervalId);
		this._intervalId = setTimeout(this.checkMonitors.bind(this), this._testInterval);
	}
	setTestInterval(millisec) {
		this._testInterval = millisec;
	}
	setMonitors(arr) {
		this._monitors = arr;
		this._hasMonitors = true;
		this.checkMonitors();
	}
	subscribe(event, callback) {
		this.addListener(event, callback);
	}
	updateStatus(id, status) {
		this._status[id] = status;
		this._broadcaseUpdate();
	}
	_checkMonitor(detail, callback) {
		console.log("_checkMonitor must be defined in the subclass");
	}
	_broadcaseUpdate() {
		this.dispatchEvent("status", this._strip(this._status));
	}
}