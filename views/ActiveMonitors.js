(function() {
	var componentName = 'active-monitors';
	var s = `
		<div class="active-monitors">
			
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
