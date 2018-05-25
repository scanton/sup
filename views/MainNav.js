(function() {
	var componentName = 'main-nav';
	var s = `
		<div class="main-nav">
			<div v-on:click="handleToggleSettings" class="pull-right icon-button">
				<i class="fas fa-ellipsis-h"></i>
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				handleToggleSettings: function() {
					sup.toggleSettings();
				}
			}
		},
		methods: {
		}
	});
})();
