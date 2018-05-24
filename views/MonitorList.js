(function() {
	var componentName = 'monitor-list';
	var s = `
		<div class="monitor-list">
			<h2>Monitors</h2>
			<div v-if="websiteMonitors.length" class="monitor-group website-monitor-group">
				<h3>Websites</h3>
				<div v-for="monitor in websiteMonitors" class="monitor website-monitor">
					<led-indicator v-bind:status="getWebsiteStatus(monitor)"></led-indicator> {{monitor.name}}
					<div class="response-time">{{getResponseTime(monitor)}}</div>
				</div>
			</div>
			<div v-if="soapMonitors.length" class="monitor-group soap-service-monitor-group">
				<h3>Soap Services</h3>
				<div v-for="monitor in soapMonitors" class="monitor soap-service-monitor">
					<led-indicator v-bind:status="getSoapStatus(monitor)"></led-indicator> {{monitor.name}}
					<div class="response-time">{{getResponseTime(monitor)}}</div>
				</div>
			</div>
			<div v-if="serviceMonitors.length" class="monitor-group service-monitor-group">
				<h3>Rest Services</h3>
				<div v-for="monitor in serviceMonitors" class="monitor service-monitor">
					<led-indicator v-bind:status="getServiceStatus(monitor)"></led-indicator> {{monitor.name}}
					<div class="response-time">{{getResponseTime(monitor)}}</div>
				</div>
			</div>
			<div v-if="jiraMonitors.length" class="monitor-group jira-monitor-group">
				<h3>Jira</h3>
				<div v-for="monitor in jiraMonitors" class="monitor jira-monitor">
					<led-indicator v-bind:status="getJiraStatus(monitor)"></led-indicator> {{monitor.name}}
					<div class="response-time">{{getResponseTime(monitor)}}</div>
				</div>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				jiraMonitors: [],
				serviceMonitors: [],
				websiteMonitors: [],
				soapMonitors: [],
				jiraStatus: {},
				serviceStatus: {},
				websiteStatus: {},
				soapStatus: {},
				responseThreshold: 3500
			}
		},
		methods: {
			getJiraStatus: function(monitor) {
				if(this.jiraStatus[monitor.id]) {
					var status = this.jiraStatus[monitor.id];
					var a = [];
					if(status.responseTime > this.responseThreshold) {
						a.push("slow-response");
					}
					if(status.passedTest) {
						a.push("test-passed");
					} else {
						a.push("test-failed");
					}
					return a.join(" ");
				}
				return "";
			},
			getResponseTime(monitor) {
				if(monitor.id) {
					var id = monitor.id;
					if(this.jiraStatus[id]) {
						return this.jiraStatus[id].responseTime;
					} else if(this.serviceStatus[id]) {
						return this.serviceStatus[id].responseTime;
					} else if(this.websiteStatus[id]) {
						return this.websiteStatus[id].responseTime;
					} else if(this.soapStatus[id]) {
						return this.soapStatus[id].responseTime;
					}
					return "";
				}
			},
			getServiceStatus: function(monitor) {
				if(this.serviceStatus[monitor.id]) {
					var status = this.serviceStatus[monitor.id];
					var a = [];
					if(status.responseTime > this.responseThreshold) {
						a.push("slow-response");
					}
					if(status.passedTest) {
						a.push("test-passed");
					} else {
						a.push("test-failed");
					}
					return a.join(" ");
				}
				return "";
			},
			getSoapStatus: function(monitor) {
				if(this.soapStatus[monitor.id]) {
					var status = this.soapStatus[monitor.id];
					var a = [];
					if(status.responseTime > this.responseThreshold) {
						a.push("slow-response");
					}
					if(status.passedTest) {
						a.push("test-passed");
					} else {
						a.push("test-failed");
					}
					return a.join(" ");
				}
				return "";
			},
			getWebsiteStatus: function(monitor) {
				if(this.websiteStatus[monitor.id]) {
					var status = this.websiteStatus[monitor.id];
					var a = [];
					if(status.responseTime > this.responseThreshold) {
						a.push("slow-response");
					}
					if(status.passedTest) {
						a.push("test-passed");
					} else {
						a.push("test-failed");
					}
					return a.join(" ");
				}
				return "";
			},
			setMonitors: function(data) {
				if(data && data.monitors) {
					if(data.monitors.website) {
						this.websiteMonitors = data.monitors.website;
					}
					if(data.monitors.jira) {
						this.jiraMonitors = data.monitors.jira;
					}
					if(data.monitors.service) {
						this.serviceMonitors = data.monitors.service;
					}
					if(data.monitors.soap) {
						this.soapMonitors = data.monitors.soap;
					}
				}
			},
			setStatus: function(data) {
				this.jiraStatus = data.jiraStatus;
				this.serviceStatus = data.serviceStatus;
				this.websiteStatus = data.websiteStatus;
				this.soapStatus = data.soapStatus;
			}
		}
	});
})();
