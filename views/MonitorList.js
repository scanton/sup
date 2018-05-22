(function() {
	var componentName = 'monitor-list';
	var s = `
		<div class="monitor-list">
			<h2>Monitors</h2>
			<div v-if="jiraMonitors.length" class="monitor-group jira-monitor-group">
				<h3>Jira</h3>
				<div v-for="monitor in jiraMonitors" class="monitor jira-monitor">
					{{monitor.name}}
				</div>
			</div>
			<div v-if="serviceMonitors.length" class="monitor-group service-monitor-group">
				<h3>Services</h3>
				<div v-for="monitor in serviceMonitors" class="monitor service-monitor">
					{{monitor.name}}
				</div>
			</div>
			<div v-if="websiteMonitors.length" class="monitor-group website-monitor-group">
				<h3>Websites</h3>
				<div v-for="monitor in websiteMonitors" class="monitor website-monitor">
					{{monitor.name}}
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
				websiteMonitors: []
			}
		},
		methods: {
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
				}
			}
		}
	});
})();
