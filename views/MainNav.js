(function() {
	var componentName = 'main-nav';
	var s = `
		<div class="main-nav">
		main nav
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
