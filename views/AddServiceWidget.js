(function() {
	var componentName = 'add-service-widget';
	var s = `
		<div class="add-service-widget">
			<div class="input-set">
				<span class="input-label">Request URL</span>
				<input type="text" name="url" />
			</div>
			<div class="input-set verb-radio">
				<radio-set v-on:change-value="handleVerbChange" label="Rest Verb" selectedOption="GET" v-bind:options="['GET', 'POST', 'PUT']"></radio-set>
			</div>
			<div class="parameters">
				<div class="header-params flex-item">
					<div class="label">Header</div>
					<name-value-mulit-input></name-value-mulit-input>
				</div>
				<div class="body-params flex-item">
					<div class="label">Body</div>
					<name-value-mulit-input></name-value-mulit-input>
				</div>
			</div>
			<div class="input-set">
				<span class="input-label">Value to Test</span>
				<input type="text" name="value-to-test" />
			</div>
			<div class="input-set assertion-radio">
				<radio-set v-on:change-value="handleAssertionChange" label="Assertion" selectedOption="Equals" v-bind:options="['Equals', 'Greater Than', 'Less Than', 'String Not Empty', 'Not Null']"></radio-set>
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
			handleAddMonitor: function() {
				var $this = $(".add-service-widget");
				var url = $this.find("input[name='url']").val();
				var verb = $this.find(".verb-radio .radio-options").attr("data-selected");
				var headers = [];
				var body = [];
				var assertion = $this.find(".assertion-radio .radio-options").attr("data-selected");
				var expectation = $this.find("input[name='expected-result']").val();
				sup.addMonitor({type: "Rest Service", url: url, verb: verb, headers: headers, body: body, assertion: assertion, expectation: expectation});
			},
			handleCancel: function() {
				this.$emit('cancel');
			},
			handleAssertionChange: function(option) {
				//console.log(option);
			},
			handleVerbChange: function(option) {
				//console.log(option);
			}
		}
	});
})();
