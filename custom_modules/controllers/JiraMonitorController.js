module.exports = class JiraMonitorController extends AbstractMonitorController {

	constructor(historyModel) {
		super();
		this.historyModel = historyModel;
	}
}