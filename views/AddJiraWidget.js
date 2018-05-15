(function() {
	var componentName = 'add-jira-widget';
	var s = `
		<div class="add-jira-widget">
			Add Jira
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
