(function() {
	var componentName = 'dashboard';
	var s = `
		<div class="dashboard">
			<button class="add-monitor-button pull-right" v-if="!isAddWidgetVisible" v-on:click="handleAddWidget">
				<span class="icon"><i class="fas fa-plus"></i></span>
				<span class="label">Add Monitor</span>
			</button>
			<add-widget v-on:cancel="handleCancelAddWidget" v-if="isAddWidgetVisible"></add-widget>
			<monitor-list></monitor-list>
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
			handleAddWidget: function() {
				this.isAddWidgetVisible = true;
			},
			handleCancelAddWidget: function() {
				this.isAddWidgetVisible = false;
			}
		}
	});
})();
