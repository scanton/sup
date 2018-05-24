process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const remote = require('electron').remote;
const {dialog} = require('electron').remote;

const EventEmitter = require(__dirname + '/custom_modules/utils/EventEmitter.js');
const AbstractModel = require(__dirname + '/custom_modules/abstracts/AbstractModel.js');
const AbstractMonitorController = require(__dirname + '/custom_modules/abstracts/AbstractMonitorController.js');
const ConfigModel = require(__dirname + '/custom_modules/models/ConfigModel.js');
const CookieModel = require(__dirname + '/custom_modules/models/CookieModel.js');
const ProjectsModel = require(__dirname + '/custom_modules/models/ProjectsModel.js');
const SettingsModel = require(__dirname + '/custom_modules/models/SettingsModel.js');
const JiraMonitorController = require(__dirname + '/custom_modules/controllers/JiraMonitorController.js');
const ServiceMonitorController = require(__dirname + '/custom_modules/controllers/ServiceMonitorController.js');
const WebsiteMonitorController = require(__dirname + '/custom_modules/controllers/WebsiteMonitorController.js');
const SoapMonitorController = require(__dirname + '/custom_modules/controllers/SoapMonitorController.js');
const SupController = require(__dirname + '/custom_modules/controllers/SupController.js');
const ViewController = require(__dirname + '/custom_modules/controllers/ViewController.js');
const viewController = new ViewController();

const views = {
	viewController: viewController,
	jiraMonitorController: new JiraMonitorController(),
	serviceMonitorController: new ServiceMonitorController(),
	websiteMonitorController: new WebsiteMonitorController(),
	soapMonitorController: new SoapMonitorController()
};
const models = {
	configModel: new ConfigModel(), 
	cookieModel: new CookieModel(),
	projectsModel: new ProjectsModel(),
	settingsModel: new SettingsModel()
};
const sup = new SupController(views, models);

require('./custom_modules/utils/enableContextMenu.js')();

const vm = new Vue({
	el: '#main-app'
});