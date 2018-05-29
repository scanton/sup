(function() {
	var componentName = 'slider-bar';
	var s = `
		<div class="slider-bar">
			<span class="max-value pull-right">{{max}}</span>
			<span class="min-value">{{min}}</span>
			<div class="rail" v-on:click="handleRailClick"></div>
			<div v-bind:style="getHandlePosition()" class="handle-label">{{value}}</div>
			<div v-bind:style="getHandlePosition()" class="handle" v-on:mousedown="handleMouseDown"></div>
		</div>
	`;
	
	Vue.component(componentName, {
		created: function() {
			viewController.registerView(componentName, this);
			$(window).on("mouseup", (e) => {
				this.handleMouseUp(e);
			});
			$(window).on("mousemove", (e) => {
				this.handleMouseMove(e);
			});
			this.value = Number(this.default);
		},
		props: ["min", "max", "default"],
		template: s,
		data: function() {
			return {
				value: 0,
				isDragging: false,
				startX: null,
				leftBound: null,
				rightBound: null
			}
		},
		methods: {
			getHandlePosition: function() {
				if(this.$el) {
					var $bar = $(this.$el);
					var $rail = $bar.find(".rail");
					this.leftBound = $rail.position().left;
					this.rightBound = this.leftBound + $rail.width() - $bar.find(".handle").width();
					var percent = ((this.value - Number(this.min)) / (Number(this.max) - Number(this.min)));
					var val = ((this.rightBound - this.leftBound) * percent) + this.leftBound;
					return "left: " + val + "px;"
				} else {
					return "left: 40px;"
				}
			},
			handleMouseDown: function(e) {
				var $bar = $(this.$el);
				var $rail = $bar.find(".rail");
				this.leftBound = $rail.position().left;
				this.rightBound = this.leftBound + $rail.width();
				this.isDragging = true;
			},
			handleMouseUp: function(e) {
				this.isDragging = false;
			},
			handleMouseMove: function(e) {
				if(this.isDragging) {
					var offsetX = $(this.$el).offset().left;
					var currentX = e.pageX - offsetX;
					var leftX = this.leftBound;
					var rightX = this.rightBound - $(this.$el).find(".handle").width();
					if(currentX < leftX) {
						currentX = leftX;
					}
					if(currentX > rightX) {
						currentX = rightX;
					}
					var percent = (currentX - leftX) / (rightX - leftX);
					this.setValueByPercent(percent);	
				}
			},
			handleRailClick: function(e) {
				var offsetX = $(this.$el).offset().left;
				var currentX = e.pageX - offsetX;
				var leftX = this.leftBound;
				var rightX = this.rightBound - $(this.$el).find(".handle").width();
				this.setValueByPercent((currentX - leftX) / (rightX - leftX));
			},
			setValueByPercent: function(percent) {
				var range = Number(this.max) - Number(this.min);
				var percentOfRange = range * percent;
				var val = percentOfRange + Number(this.min);
				this.value = Math.floor(val);
				this.$emit('change-value', this.value);
			}
		}
	});
})();
