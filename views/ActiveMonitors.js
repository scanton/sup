(function() {
	var componentName = 'active-monitors';
	var s = `
		<div class="active-monitors">
			<div v-show="history.length">
				<h2>{{monitor.name}}</h2>
				<div class="last-ping-time">{{getLastPing()}}</div>
				<div class="chart"></div>
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
				monitor: {},
				history: []
			}
		},
		methods: {
			getLastPing: function() {
				if(this.history && this.history.length) {
					return this.history[this.history.length - 1];
				}
			},
			viewMonitor: function(data) {
				this.monitor = data.monitor;
				this.history = data.history;
				/*
				var a = [];
				var l = this.history.length;
				for(var i = 0; i < l; i++) {
					a.push({value: this.history[i]});
				}
				new Morris.Line({
					element: $(".active-monitors").find(".chart")[0],
					data: a,
					xkey: 'Response Time',
					ykeys: ['Response'],
					labels: ['Response']
				});
				/*
				var ctx = $(".active-monitors").find("canvas")[0].getContext('2d');
				var displayData = data.history;
				if(displayData.length > 50) {
					displayData = displayData.slice(displayData.length - 51);
				}
				var options = {
					type: "line",
					data: {
						datasets: [{
							label: "Response Time",
							data: displayData
						}]
					},
					options: {
						legend: {display: false},
						title: {
							display: true,
							text: data.monitor.name
						}
					}
				};
				console.log(options);
				this._chart = new Chart(ctx, options);
				*/
			}
		}
	});
})();
