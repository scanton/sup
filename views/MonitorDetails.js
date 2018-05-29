(function() {
	var componentName = 'monitor-details';
	var s = `
		<div class="monitor-details">
			<div v-show="history.length">
				<h2>
					{{monitor.name}}
				</h2>
				<div class="dashboard-group">
					<div class="value last-response-time">{{getLastResponse()}}</div>
					<div class="label">milliseconds</div>
				</div>
				<div class="dashboard-group">
					<div class="value lesser-value average-response-time">{{getAverage()}}</div>
					<div class="label">average</div>
				</div>
				<div class="dashboard-group">
					<div class="value lesser-value average-response-time">{{getMin()}}</div>
					<div class="label">minimum</div>
				</div>
				<div class="dashboard-group">
					<div class="value lesser-value average-response-time">{{getMax()}}</div>
					<div class="label">maximum</div>
				</div>
				<div id="active-monitors-chart"></div>
				<slider-bar min="5" max="4000" default="10"></slider-bar>
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
			getLastResponse: function() {
				if(this.history && this.history.length) {
					return this.history[this.history.length - 1];
				}
			},
			getAverage: function() {
				var l = this.history.length;
				var sum = 0;
				while(l--) {
					sum += this.history[l];
				}
				return Math.round(sum / this.history.length);
			},
			getMin: function() {
				var l = this.history.length;
				var min = Number.POSITIVE_INFINITY;
				while(l--) {
					min = Math.min(min, this.history[l]);
				}
				return min;
			},
			getMax: function() {
				var l = this.history.length;
				var max = Number.NEGATIVE_INFINITY;
				while(l--) {
					max = Math.max(max, this.history[l]);
				}
				return max;
			},
			isQuickResponse: function() {
				var average = this.getAverage();
				var response = this.getLastResponse();
				console.log(response, average, response < average);
				return response < average;
			},
			viewMonitor: function(data) {
				this.monitor = data.monitor;
				this.history = data.history;
				
				var a = [];
				var l = this.history.length;
				var begin = l - 40;
				if(begin < 0) {
					begin = 0;
				}
				for(var i = begin; i < l; i++) {
					a.push({i: i, value: this.history[i]});
				}

				$("#active-monitors-chart").html("");
				config = {
					data: a,
					xkey: 'i',
					ykeys: ['value'],
					labels: ['Respnose Time'],
					fillOpacity: 0.6,
					hideHover: 'auto',
					behaveLikeLine: true,
					resize: true,
					//pointFillColors:['#ffffff'],
					//pointStrokeColors: ['black'],
					lineColors:['gray']
				};
				config.element = 'active-monitors-chart';
				setTimeout(function() {
					Morris.Area(config);	
				}, 10);
			}
		}
	});
})();
