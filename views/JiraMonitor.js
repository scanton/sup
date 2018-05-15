(function() {
	var componentName = 'jira-monitor';
	var s = `
		<div class="jira-monitor">
			jira-monitor
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
			}
		},
		methods: {
		}
	});
})();
