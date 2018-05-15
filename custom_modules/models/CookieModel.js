module.exports = class CookieModel extends AbstractModel {

	constructor() {
		super();
		this._cookies = {};
		this._dispatchUpdate();
	}

	deleteCookie(domain, name) {
		if(this._cookies[domain][name]) {
			delete this._cookies[domain][name];
			this._dispatchUpdate();
		}
	}
	getCookie(domain, name) {
		if(this._cookies[domain]) {
			return this._cookies[domain][name];
			this._dispatchUpdate();
		}
	}
	setCookie(domain, name, value) {
		if(domain && name) {
			if(!this._cookies[domain]) {
				this._cookies[domain] = {};
			}
			this._cookies[domain][name] = value;
			this._dispatchUpdate();
		}
	}

	_dispatchUpdate() {
		this.dispatchEvent("data", this._strip(this._cookies));
	}
}