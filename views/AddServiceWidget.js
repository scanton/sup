(function() {
	var componentName = 'add-service-widget';
	var s = `
		<div class="add-service-widget">
			Add Service
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
