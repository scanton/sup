(function() {
	var componentName = 'slider-bar';
	var s = `
		<div class="slider-bar">
			<span class="max-value pull-right">{{max}}</span>
			<span class="min-value">{{min}}</span>
			<div class="rail"></div>
			<div class="handle"></div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		props: ["min", "max", "default"],
		template: s,
		data: function() {
			return {
				value: this.default
			}
		},
		methods: {
		}
	});
})();
