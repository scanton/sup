(function() {
	var componentName = 'dashboard';
	var s = `
		<div v-bind:class="{'settings-is-visible': settingsIsVisible}" class="dashboard">
			<div class="nav-buttons">
				<button class="play-slideshow-button pull-right" v-on:click="handlePlaySlideshow">
					<span class="icon"><i class="fas fa-tv"></i></span>
					<span class="label">Play Slideshow</span>
				</button>
				<button class="show-dashboard-button pull-right" v-if="isAddWidgetVisible" v-on:click="handleCancelAddWidget">
					<span class="icon"><i class="fas fa-tachometer-alt"></i></span>
					<span class="label">Show Dashboard</span>
				</button>
				<button class="add-monitor-button pull-right" v-if="!isAddWidgetVisible" v-on:click="handleAddWidget">
					<span class="icon"><i class="fas fa-plus"></i></span>
					<span class="label">Add Monitor</span>
				</button>
				<div class="clear"></div>
			</div>
			<add-widget v-on:cancel="handleCancelAddWidget" v-if="isAddWidgetVisible"></add-widget>
			<monitor-list></monitor-list>
			<monitor-details v-show="!isAddWidgetVisible"></monitor-details>
			<settings-panel ref="slider"></settings-panel>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				isAddWidgetVisible: false,
				settingsIsVisible: false
			}
		},
		methods: {
			handleAddWidget: function() {
				this.isAddWidgetVisible = true;
			},
			handleCancelAddWidget: function() {
				this.isAddWidgetVisible = false;
			},
			handlePlaySlideshow: function() {
				sup.playSlideshow();
			},
			toggleSettings: function() {
				this.settingsIsVisible = !this.settingsIsVisible;
			}
		}
	});
})();
