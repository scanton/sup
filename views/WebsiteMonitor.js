(function() {
	var componentName = 'website-monitor';
	var s = `
		<div class="website-monitor">
			website-monitor
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
