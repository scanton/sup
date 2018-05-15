(function() {
	var componentName = 'add-website-widget';
	var s = `
		<div class="add-website-widget">
			Add Website
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
