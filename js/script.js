const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const EventEmitter = require(__dirname + '/custom_modules/utils/EventEmitter.js');
const AbstractModel = require(__dirname + '/custom_modules/abstracts/AbstractModel.js');
const ConfigModel = require(__dirname + '/custom_modules/models/ConfigModel.js');
const CookieModel = require(__dirname + '/custom_modules/models/CookieModel.js');
const SupController = require(__dirname + '/custom_modules/controllers/SupController.js');
const ViewController = require(__dirname + '/custom_modules/controllers/ViewController.js');
const viewController = new ViewController();

const views = {
	viewController: viewController
};
const models = {
	configModel: new ConfigModel(), 
	cookieModel: new CookieModel()
};
const sup = new SupController(views, models);

require('./custom_modules/utils/enableContextMenu.js')();

const vm = new Vue({
	el: '#main-app'
});