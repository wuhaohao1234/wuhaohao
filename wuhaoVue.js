function Watcher({ el, vm, uData, attr }) {
	this.el = el;
    this.vm = vm;
    this.uData = uData;
    this.attr = attr;
    this.update();
}
Watcher.prototype.update = function() {
	this.el[this.attr] = this.vm.$data[this.uData];
}

function Map() {

}
Map.prototype = {
	set : function(key,value) {
		this[key] = value
	},
	get : function(key) {
		return this[key]
	}
}



function MiniVue(options) {
	this.$options = options;                        
    this.$el = document.querySelector(options.el);  
    this.$data = options.data;                      
    this.$methods = options.methods;

    this.watchers = new Map();
    

    this._observe(this.$data);                      //对data进行处理
    this._compile(this.$el);
}
MiniVue.prototype = {
	_observe : function(obj) {
		for(var key in obj) {
			if (obj.hasOwnProperty(key)) {
				// 给属性注册wather数组
				this.watchers.set(key, { _directives: [] })
				// console.log(this.watchers)

				var value = obj[key];
				// 如果属性是个对象 则继续对他进行观察
		        if (typeof value === 'object') {
		          this._observe(value);
		        }

		        var watchers = this.watchers.get(key);

		        Object.defineProperty(this.$data, key, {
		          // get 方法
		          get : function() {
		            return value;
		          },
		          // set 方法
		          set : function(newValue) {
		            // 把值变成新值
		            value = newValue;
		            // 遍历执行 watcher
		            for(var i = 0;i < watchers._directives.length;i ++){
		            	console.log(watchers._directives[i])
		            	watchers._directives[i].update()
		            }
		          }
		        });

			}
		}
	},
	_compile : function(el) {
		var _this = this
		var nodes = el.children

		for(var i = 0;i < nodes.length;i ++) {
			var node = nodes[i]

			if (node.children.length) {
		    	this._compile(node);
		    }
		    // 处理mv-click指令
			if (node.hasAttribute('mv-click')) {
			// 监听事件
				node.addEventListener('click',function() {
					var method = this.getAttribute('mv-click');
					
					_this.$methods[method].call(_this.$data);
				})
			}

			// 处理vm-model指令
			if (node.hasAttribute('mv-model') && (node.tagName === 'INPUT')) {
			// 绑定的属性
				var uData = node.getAttribute('mv-model');
				// 给这个属性增加一个watcher
				this.watchers.get(uData)._directives.push(new Watcher({
					el: node,
					vm: this,
					uData,
					attr: 'value'
				}));
				// 绑定事件 每次把新的value赋值给对应的属性 因为有set 所以回去执行watcher
				node.addEventListener('keyup',function(){
					_this.$data[uData] = this.value	
				})
				
			}
			if (node.hasAttribute('mv-bind')) {
			// 获取绑定的属性
				var uData = node.getAttribute('mv-bind');
				//给属性增加一个watcher
				this.watchers.get(uData)._directives.push(new Watcher({
					el: node,
					vm: this,
					uData,
					attr: 'innerHTML'
				}));
				
			}
		}
	}
}

