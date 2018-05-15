(function() {
	var componentName = 'work-area';
	var s = `
		<div v-bind:class="{'left-nav-is-visible': isLeftNavVisible, 'settings-is-visible': isSettingsVisible}" class="work-area">
			<dashboard></dashboard>
			<settings-nav></settings-nav>
			<main-nav></main-nav>
			<left-nav></left-nav>
			<footer-bar></footer-bar>
		</div>
	`;

	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				isLeftNavVisible: false,
				isSettingsVisible: false
			}
		},
		methods: {
			setIsLeftNavVisible: function(bool) {
				this.isLeftNavVisible = bool;
			},
			toggleLeftNav: function() {
				this.isLeftNavVisible = !this.isLeftNavVisible;
			},
			toggleSettings: function() {
				this.isSettingsVisible = !this.isSettingsVisible;
			}
		}
	});
})();
