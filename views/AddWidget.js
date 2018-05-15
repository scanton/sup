(function() {
	var componentName = 'add-widget';
	var s = `
		<div class="add-widget">
			<span class="label">Widget Type</span>
			<ul class="radio-options">
				<li 
					v-on:click="handleTypeChange(type)" 
					v-for="type in widgetTypes"
					v-bind:class="{selected: type == selectedType}">
					{{type}}
				</li>
			</ul>
			<add-jira-widget v-if="selectedType == 'Jira'"></add-jira-widget>
			<add-service-widget v-if="selectedType == 'Service'"></add-service-widget>
			<add-website-widget v-if="selectedType == 'Website'"></add-website-widget>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
		},
		template: s,
		data: function() {
			return {
				selectedType: "Website",
				widgetTypes: ["Jira", "Service", "Website"]
			}
		},
		methods: {
			handleTypeChange: function(type) {
				this.selectedType = type;
			}
		}
	});
})();
