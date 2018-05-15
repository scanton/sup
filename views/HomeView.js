(function() {
	var componentName = 'home-view';
	var s = `
		<div class="home-view">
			home
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
