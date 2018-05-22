(function() {
	var componentName = 'main-nav';
	var s = `
		<div class="main-nav">
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
