(function (window, undefined) {
    var jQuery = function (selector) {
        return new jQuery.prototype.init(selector)
    }
    jQuery.prototype = {
        constructor: jQuery,
        init: function (selector) {
            // 去除字符串两端的空格
            selector = jQuery.trim(selector)
            // 判断selector是否是undefined或null
            if (!selector) {
                // 字符串处理
            } else if (jQuery.isString(selector)) {
                // 判断是否是代码片段
                if (jQuery.isHTML(selector)) {
                    // 根据代码片段创建元素,将创建好的一级元素添加到jquery中,给jquery对象添加length属性,返回加工好的this
                    var temp = document.createElement('div')
                    temp.innerHTML = selector
                    // for(var i = 0;i < temp.children.length;i ++){
                    //     this[i] = temp.children[i]
                    // }
                    // this.length = temp.children.length
                    var arr = []
                    arr.push.apply(this, temp.children)  //不知道为何[]不好使,只能搞一个arr数组
                    // 查询dom
                } else {
                    var res = document.querySelectorAll(selector)
                    var arr = []
                    arr.push.apply(this, res)
                }
                // 数组处理
            } else if (jQuery.isArray(selector)) {
                var arr = []
                // 把真数组转成伪数组放入$
                var arr2 = arr.slice.call(selector)
                // 将自定义的伪数组转换成真数组
                arr.push.apply(this, selector)
            } else if (jQuery.isFunction(selector)) {
                jQuery.ready(selector)
            }
            else {
                this[0] = selector;
                this.length = 1;
            }
            return this;
        },
        jquery: '吴昊的jquery',
        selector: '',
        length: 0,
        push: [].push,
        sort: [].sort,
        splice: [].splice,
        toArray: function () {
            return [].slice.call(this)
        },
        get: function (num) {
            if (arguments.length == 0) {
                return this.toArray()
            } else if (num >= 0) {
                return this[num]
            } else {
                return this[this.length + num]
            }
        },
        eq: function (num) {
            if (arguments.length === 0) {
                return new jQuery()
            } else {
                return jQuery(this.get(num))
            }
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        each: function (fn) {
            return jQuery.each(this, fn)
        }
    }
    jQuery.extend = jQuery.prototype.extend = function (obj) {
        for (var key in obj) {
            this[key] = obj[key]
        }
    }
    // 工具方法
    jQuery.extend({
        isString: function (str) {
            return typeof str == 'string'
        },
        isHTML: function (str) {
            return str.charAt(0) == '<' && str.charAt(str.length - 1) == '>' && str.length >= 3
        },
        trim: function (str) {
            if (!jQuery.isString(str)) {
                return str
            }
            if (str.trim) {
                return str.trim()
            } else {
                return str.replace(/^\s+|\s$/g, '')
            }
        },
        isObject: function (selector) {
            return typeof selector === 'object'
        },
        isWindow: function (selector) {
            return selector === 'window'
        },
        isArray: function (selector) {
            if (jQuery.isObject(selector) && !jQuery.isWindow(selector) && 'length' in selector && selector.push) {
                return true
            } else {
                return false
            }
        },
        isFunction: function (selector) {
            return typeof selector === 'function'
        },
        ready: function (fn) {
            if (document.readyState == 'complete') {
                fn()
            }
            else if (document.addEventListener) {
                document.addEventListener('DOMContentLoaded', function () {
                    fn()
                })
            } else {
                document.attachEvent('onreadystatechange', function () {
                    if (document.readyState == 'complete') {
                        fn()
                    }
                })
            }
        },
        each: function (obj, fn) {
            if (jQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var res = fn.call(obj[i], i, obj[i])
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            } else if (jQuery.isObject(obj)) {
                for (var key in obj) {
                    var res = fn.call(obj[key], key, obj[key])
                    if (res === true) {
                        continue;
                    } else if (res === false) {
                        break;
                    }
                }
            }
            return obj
        },
        map: function (obj, fn) {
            var res = []
            if (jQuery.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    var temp = fn(obj[i], i)
                    if (temp) {
                        res.push(temp)
                    }
                }
            } else if (jQuery.isObject(obj)) {
                for (var key in obj) {
                    var temp = fn(obj[key], key)
                    if (temp) {
                        res.push(temp)
                    }
                }
            }
            return res
        },
        getStyle: function (obj, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(obj)[attr]
            } else {
                return obj.currentStyle[attr]
            }
        },
        addEvent: function (obj, name, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(name, fn)
            } else {
                obj.attachEvent('on' + name, fn)
            }

        },
        startMov: function (obj, json, fn) {
            clearInterval(obj.timer);//执行动画之前清除动画
            var flag = true;//是否动画都完成了
            obj.timer = setInterval(function () {
                for (var attr in json) {
                    var icur = 0;
                    if (attr == 'opacity') {
                        icur = Math.round(parseFloat(jQuery.getStyle(obj, attr)) * 100);//转换成整数,并且四舍五入下
                        //计算机在计算小数的时候往往是不准确的！
                    }
                    else {
                        icur = parseInt(jQuery.getStyle(obj, attr));
                    }
                    var speed = 0;
                    speed = (json[attr] - icur) / 8;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
                    if (icur != json[attr]) {
                        flag = false;
                    }
                    if (attr == 'opacity') {
                        obj.style.filter = 'alpha(opacity:' + (icur + speed) + ')';
                        obj.style.opacity = (icur + speed) / 100;
                    }
                    else {
                        obj.style[attr] = icur + speed + 'px';
                    }
                    if (flag) {
                        clearInterval(obj.timer);
                        if (fn) {
                            fn();
                        }
                    }
                }
            }, 30);
        },
        getParmeter: function (data) {
            var result = "";
            for (var key in data) {
                result = result + key + "=" + data[key] + "&";
            }
            /*将结果最后多余的&截取掉*/
            return result.slice(0, -1);
        },
        ajax: function (obj) {
            /*1.判断有没有传递参数，同时参数是否是一个对象*/
            if (obj == null || typeof obj != "object") {
                return false;
            }
            /*2.获取请求类型,如果没有传递请求方式，那么默认为get*/
            var type = obj.type || 'get';
            /*3.获取请求的url  location.pathname:就是指当前请求发起的路径*/
            var url = obj.url || location.pathname;
            /*4.获取请求传递的参数*/
            var data = obj.data || {};
            /*4.1获取拼接之后的参数*/
            data = this.getParmeter(data);
            /*5.获取请求传递的回调函数*/
            var success = obj.success || function () { };

            /*6:开始发起异步请求*/
            /*6.1:创建异步对象*/
            var xhr = new XMLHttpRequest();
            /*6.2:设置请求行,判断请求类型，以此决定是否需要拼接参数到url*/
            if (type == 'get') {
                url = url + "?" + data;
                /*重置参数，为post请求简化处理*/
                data = null;
            }
            xhr.open(type, url);
            /*6.2:设置请求头:判断请求方式，如果是post则进行设置*/
            if (type == "post") {
                xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            }
            /*6.3:设置请求体,post请求则需要传递参数*/
            xhr.send(data);

            /*7.处理响应*/
            xhr.onreadystatechange = function () {
                /*8.判断响应是否成功*/
                if (xhr.status == 200 && xhr.readyState == 4) {
                    /*客户端可用的响应结果*/
                    var result = xhr.responseText;
                    /*11.拿到数据，调用客户端传递过来的回调函数*/
                    success(result);
                }
            }
        }
    })


    // dom操作相关方法
    jQuery.prototype.extend({
        empty: function () {
            this.each(function (key, value) {
                value.innerHTML = ''
            })
            return this;
        },
        remove: function (selector) {
            if (arguments.length === 0) {
                this.each(function (key, value) {
                    var parent = value.parentNode
                    parent.removeChild(value)
                })
            } else {
                var $this = this;
                $(selector).each(function (key, value) {
                    var type = value.tagName;
                    $this.each(function (k, v) {
                        var t = v.tagName;
                        if (t === type) {
                            var parent = value.parentNode
                            parent.remove(value)
                        }
                    })
                })
            }
            return this;
        },
        html: function (content) {
            if (arguments.length == 0) {
                return this[0].innerHTML
            } else {
                this.each(function (key, value) {
                    value.innerHTML = content
                })
            }
        },
        text: function (content) {
            if (arguments.length == 0) {
                var res = ''
                this.each(function (key, value) {
                    res += value.innerText;
                })
                return res;
            } else {
                this.each(function (key, value) {
                    value.innerText = content;
                })
            }
        },
        appendTo: function (selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.appendChild(v)
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        value.appendChild(temp)
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        prependTo: function (selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                $this.each(function (k, v) {
                    if (key === 0) {
                        value.insertBefore(v, value.firstChild)
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        value.insertBefore(temp, value.firstChild)
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        append: function (selector) {
            if (jQuery.isString(selector)) {

                this.html(this.html() + selector)
            } else {
                $(selector).appendTo(this)
            }
            return this
        },
        prepend: function (selector) {
            if (jQuery.isString(selector)) {
                this.html(selector + this.html())
            } else {
                $(selector).prependTo(this)
            }
            return this
        },
        insertBefore: function (selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                var parent = value.parentNode
                $this.each(function (k, v) {
                    if (key === 0) {
                        parent.insertBefore(v, value)
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        parent.insertBefore(temp, value)
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        before: function (selector) {
            var parent = this[0].parentNode
            if (jQuery.isString(selector)) {
                this[0].previousSibling.data = selector
            } else {
                selector.insertBefore(this)
            }
            return this
        },
        replaceAll: function (selector) {
            var $this = this;
            var $target = $(selector)
            var res = []
            $.each($target, function (key, value) {
                var parent = value.parentNode
                $this.each(function (k, v) {
                    if (key === 0) {
                        parent.insertBefore(v, value)
                        $(value).remove()
                        res.push(v)
                    } else {
                        var temp = v.cloneNode(true)
                        $(temp).insertBefore(value)
                        $(value).remove()
                        res.push(temp)
                    }
                })
            })
            return $(res)
        },
        clone: function (deep) {
            var res = []
            if (!deep) {
                this.each(function (key, ele) {
                    var temp = ele.cloneNode(true)
                    res.push(temp)
                })
            } else {
                this.each(function (key, ele) {
                    var temp = ele.cloneNode(true)
                    jQuery.each(ele.eventsCache, function (name, array) {
                        jQuery.each(array, function (index, method) {

                            $(temp).on(name, method)
                        })
                    })
                    res.push(temp)
                })
            }
            return $(res)
        }
    })
    // 属性操作相关方法
    jQuery.prototype.extend({
        attr: function (attr, value) {
            if (jQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0].getAttribute(attr)
                } else {
                    this.each(function (key, ele) {
                        ele.setAttribute(attr, value)
                    })
                }
            } else if (jQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele.setAttribute(key, value)
                    })
                })
            }
            return this;
        },
        prop: function (attr, value) {
            if (jQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return this[0][attr]
                } else {
                    this.each(function (key, ele) {
                        ele[attr] = value
                    })
                }
            } else if (jQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele[key] = value
                    })
                })
            }
            return this;
        },
        css: function (attr, value) {
            if (jQuery.isString(attr)) {
                if (arguments.length === 1) {
                    return jQuery.getStyle(this[0], attr)
                } else {
                    this.each(function (key, ele) {
                        ele.style[attr] = value
                    })
                }
            } else if (jQuery.isObject(attr)) {
                var $this = this;
                $.each(attr, function (key, value) {
                    $this.each(function (k, ele) {
                        ele.style[key] = value
                    })
                })
            }
            return this;
        },
        val: function (content) {
            if (arguments.length === 0) {
                return this[0].value;
            }
            if (jQuery.isString(content)) {
                this.each(function (key, ele) {
                    ele.value = content
                })
            }
            return this;
        },
        hasClass: function (content) {
            var flag = false;
            if (arguments.length === 0) {
                return false;
            } else {
                var str = ' ' + content + ' ';
                this.each(function (key, ele) {
                    var className = ' ' + ele.className + ' '
                    if (className.indexOf(str) != -1) {
                        flag = true;
                        return false;
                    }
                })
            }
            return flag;
        },
        addClass: function (name) {
            if (arguments.length === 0) {
                return this;
            } else {
                var names = name.split(' ')
                this.each(function (key, ele) {
                    $.each(names, function (k, value) {
                        if (!($(ele).hasClass(value))) {
                            ele.className = ele.className + ' ' + value;
                        }
                    })
                })
            }
            return this
        },
        removeClass: function (name) {
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    ele.className = ''
                })
            } else {
                var names = name.split(' ')
                this.each(function (key, ele) {
                    $.each(names, function (k, value) {
                        if (($(ele).hasClass(value))) {
                            ele.className = (' ' + ele.className + ' ').replace(' ' + value + ' ', ' ')
                        }
                    })
                })
            }
            return this
        },
        toggleClass: function (name) {
            if (arguments.length === 0) {
                $(ele).removeClass()
            }
            var names = name.split(' ')
            this.each(function (key, ele) {
                $.each(names, function (k, value) {
                    if (($(ele).hasClass(value))) {
                        $(ele).removeClass(value)
                    } else {
                        $(ele).addClass(value)
                    }
                })
            })
            return this
        }
    })
    // 事件相关方法
    jQuery.prototype.extend({
        on: function (name, callback) {
            this.each(function (key, ele) {
                if (!ele.eventsCache) {
                    ele.eventsCache = {}
                }
                if (!ele.eventsCache[name]) {
                    ele.eventsCache[name] = []
                    ele.eventsCache[name].push(callback)
                    jQuery.addEvent(ele, name, function () {
                        jQuery.each(ele.eventsCache[name], function (k, method) {
                            method()
                        })
                    })
                } else {
                    ele.eventsCache[name].push(callback)
                }
            })
            return this
        },
        off: function (name, callback) {
            if (arguments.length === 0) {
                this.each(function (key, ele) {
                    ele.eventsCache = {}
                })
            } else if (arguments.length === 1) {
                this.each(function (key, ele) {
                    ele.eventsCache[name] = []
                })
            }
            else if (arguments.length === 2) {
                this.each(function (key, ele) {
                    jQuery.each(ele.eventsCache[name], function (index, method) {
                        if (method === callback) {
                            ele.eventsCache[name].splice(index, 1)
                        }
                    })

                })
            }
        },
        animate: function (json, fn) {
            this.each(function (key, ele) {
                jQuery.startMov(ele, json, fn)
            })
            return this
        }
    })
    jQuery.prototype.init.prototype = jQuery.prototype
    window.jQuery = window.$ = jQuery
})(window)


// 128