(function() {
	var componentName = 'dashboard';
	var s = `
		<div class="dashboard">
			<button v-if="!isAddWidgetVisible" v-on:click="handleAddWidget">
				<span class="icon"><i class="fas fa-plus"></i></span>
				<span class="label">Add Widget</span>
			</button>
			<add-widget v-if="isAddWidgetVisible"></add-widget>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				isAddWidgetVisible: false
			}
		},
		methods: {
			handleAddWidget: function(e) {
				e.preventDefault();
				console.log("add widget");
				this.isAddWidgetVisible = true;
			}
		}
	});
})();
