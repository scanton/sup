(function() {
	var componentName = 'left-nav';
	var s = `
		<div class="left-nav">
			left nav
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
