(function() {
	var componentName = 'add-soap-service-widget';
	var s = `
		<div class="add-soap-service-widget">
			<div class="input-set">
				<span class="input-label">WSDL</span>
				<input type="text" name="url" />
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
				var $this = $(".add-soap-service-widget");
				var url = $this.find("input[name='url']").val();
				var name = $(".add-widget input[name='name']").val();
				sup.addMonitor({monitorType: "Soap Service", url: url, name: name});
				this.$emit('cancel');
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
