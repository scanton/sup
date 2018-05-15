(function() {
	var componentName = 'service-monitor';
	var s = `
		<div class="service-monitor">
			service-monitor
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
