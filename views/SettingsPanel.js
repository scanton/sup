(function() {
	var componentName = 'settings-panel';
	var s = `
		<div class="settings-panel">
			<h2>Settings</h2>
			<div class="settings-group">
				<on-off-switch></on-off-switch>
			</div>
			<div class="settings-group">
				<check-box></check-box>
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
			}
		},
		methods: {
		}
	});
})();