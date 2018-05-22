(function() {
	var componentName = 'add-website-widget';
	var s = `
		<div class="add-website-widget">
			<div class="input-set">
				<span class="input-label">Website URL</span>
				<input type="text" name="url" />
			</div>
			<div class="input-set">
				<span class="input-label">CSS Query</span>
				<input type="text" name="css-query" />
			</div>
			<div class="input-set assertion-radio">
				<radio-set label="Assertion" selectedOption="Equals" v-bind:options="['Equals', 'Greater Than', 'Less Than', 'String Not Empty', 'Not Null']"></radio-set>
			</div>
			<div class="input-set">
				<span class="input-label">Expected Result</span>
				<input type="text" name="expected-result" />
			</div>
			<button v-on:click="handleAddMonitor" class="most-likely-action">
				<span class="icon"><i class="fas fa-plus"></i></span>
				<span class="label">Add Service Monitor</span>
			</button>
			<button v-on:click="handleCancel">
				<span class="icon"><i class="fas fa-times"></i></span>
				<span class="label">Cancel</span>
			</button>
			<div class="clear"></div>
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
			handleCancel: function() {
				this.$emit('cancel');
			},
			handleAddMonitor: function() {
				var $this = $(".add-website-widget");
				var url = $this.find("input[name='url']").val();
				var query = $this.find("input[name='css-query']").val();
				var assertion = $this.find(".assertion-radio .radio-options").attr("data-selected");
				var expectation = $this.find("input[name='expected-result']").val();
				var name = $(".add-widget input[name='name']").val();
				sup.addMonitor({monitorType: "Website", url: url, query: query, assertion: assertion, expectation: expectation, name: name});
				this.$emit('cancel');
			}
		}
	});
})();
