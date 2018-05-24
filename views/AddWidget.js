(function() {
	var componentName = 'add-widget';
	var s = `
		<div class="add-widget input-collection">
			<h2>Add Monitor</h2>
			<div class="input-set">
				<span class="input-label">Name</span>
				<input type="text" name="name" />
			</div>
			<div class="input-set">
				<radio-set v-on:change-value="handleTypeChange" label="Monitor Type" v-bind:selectedOption="selectedType" v-bind:options="['Jira', 'Rest Service', 'Soap Service', 'Website']"></radio-set>
			</div>
			<add-jira-widget v-on:cancel="handleCancel" v-if="selectedType == 'Jira'"></add-jira-widget>
			<add-service-widget v-on:cancel="handleCancel" v-if="selectedType == 'Rest Service'"></add-service-widget>
			<add-soap-service-widget v-on:cancel="handleCancel" v-if="selectedType == 'Soap Service'"></add-soap-service-widget>
			<add-website-widget v-on:cancel="handleCancel" v-if="selectedType == 'Website'"></add-website-widget>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				selectedType: "Website"
			}
		},
		methods: {
			handleTypeChange: function(type) {
				this.selectedType = type;
			},
			handleCancel: function() {
				this.$emit('cancel');
			}
		}
	});
})();
