(function() {
	var componentName = 'add-jira-widget';
	var s = `
		<div class="add-jira-widget">
			<div class="input-collection">
				<div class="input-set">
					<span class="input-label">Host</span>
					<input type="text" name="host" />
				</div>
				<div class="input-set">
					<span class="input-label">Port</span>
					<input type="text" name="port" />
				</div>
				<div class="input-set">
					<span class="input-label">Username</span>
					<input type="text" name="username" />
				</div>
				<div class="input-set">
					<span class="input-label">Password</span>
					<input type="password" name="password" />
				</div>
				<button v-on:click="handleAddMonitor" class="most-likely-action">
					<span class="icon"><i class="fas fa-plus"></i></span>
					<span class="label">Add Jira Monitor</span>
				</button>
				<button v-on:click="handleCancel">
					<span class="icon"><i class="fas fa-times"></i></span>
					<span class="label">Cancel</span>
				</button>
				<div class="clear"></div>
			</div>
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
				var $this = $(".add-jira-widget");
				var host = $this.find("input[name='host']").val();
				var port = $this.find("input[name='port']").val();
				var username = $this.find("input[name='username']").val();
				var password = $this.find("input[name='password']").val();
				var name = $(".add-widget input[name='name']").val();
				sup.addMonitor({monitorType: "Jira", host, port, username, password, name: name});
				this.$emit('cancel');
			},
			handleCancel: function() {
				this.$emit('cancel');
			}
		}
	});
})();
