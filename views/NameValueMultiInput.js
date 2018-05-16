(function() {
	var componentName = 'name-value-mulit-input';
	var s = `
		<div class="name-value-mulit-input">
			<input type="text" name="name" placeholder="name" />
			<input type="text" name="value" placeholder="value" />
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				name: "",
				value: ""
			}
		},
		methods: {
		}
	});
})();
