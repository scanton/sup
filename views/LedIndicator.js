(function() {
	var componentName = 'led-indicator';
	var s = `
		<div v-bind:class="status" class="led-indicator">
			<div class="highlight"></div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		props: ["status"],
		template: s,
		data: function() {
			return {
			}
		},
		methods: {
		}
	});
})();
