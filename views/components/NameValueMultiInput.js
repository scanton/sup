(function() {
	var componentName = 'name-value-mulit-input';
	var s = `
		<div class="name-value-mulit-input">
			<div class="multi-input-group add-new-value-group">
				<input v-on:change="handleChange" type="text" name="name" placeholder="+ name" />
				<input v-on:change="handleChange" type="text" name="value" placeholder="+ value" />
			</div>
			<div v-for="item in values" class="multi-input-group">
				<input type="text" name="name" placeholder="name" v-bind:value="item.name" />
				<input type="text" name="value" placeholder="value" v-bind:value="item.value" />
			</div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		props: ["values"],
		template: s,
		data: function() {
			return {}
		},
		methods: {
			handleChange: function(e) {
				var $container = $(e.target).closest(".add-new-value-group");
				var $name = $container.find("input[name='name']");
				var $value = $container.find("input[name='value']");
				var name = $name.val();
				var value = $value.val();
				if(name && value) {
					if(!this.values) {
						this.values = [];
					}
					this.values.push({name: name, value: value});
					$name.val("");
					$value.val("");
				}
			}
		}
	});
})();
