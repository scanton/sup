(function() {
	var componentName = 'active-monitor';
	var s = `
		<div class="active-monitor">
			&nbsp;
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
