
// 轮播图插件封装,只需通过new WuSowind(data)即可,前提外部必须有一个class为banner的空盒子
(function (window) {
    var WuSowind = function (data) {
        this.data = data
        this.init(this.data)
    }
    WuSowind.prototype = {
        // 数据初始化
        init: function () {
            this.container = document.createElement('div')
            this.container.className = 'container'
            this.container.innerHTML = `
            <ul>
                <li>
                    <a href="#">
                        <img src=${data[0]} alt="">
                    </a>
                </li>
            </ul>
            <span class="btn_left">
                <img src="images/l.png" alt="">
            </span>
            <span class="btn_right">
                <img src="images/r.png" alt="">
            </span>
        `
            document.querySelector('.banner').appendChild(this.container)
            setTimeout(() => {
                this.htmlDom()
            }, 100);
        },
        // dom树舒适化
        htmlDom: function () {
            this.oUlNode = document.querySelector('.banner .container ul')
            this.length = document.querySelector('.banner .container ul li a img').offsetWidth
            this.height = document.querySelector('.banner .container ul li a img').offsetHeight
            this.oUlNode.innerHTML = ''
            for (var i = 0; i < this.data.length; i++) {
                this.oUlNode.innerHTML += `
                <li>
                    <a href="#">
                        <img src=${data[i]} alt="">
                    </a>
                </li>
            `
            }
            this.styleDom()
        },
        // css树初始化
        styleDom: function () {
            this.styleNode = document.createElement('style')
            this.styleNode.innerHTML = `
            .container,
            .container ul,
            .container ul li,
            .container ul li a,
            .container ul li a img,
            .btn_right,.btn_left
            {
                margin:0;
                padding:0;
            }
            .container{
            width:${this.length}px;
            height: ${this.height}px;
            position: relative;
            margin: 0 auto;
            overflow: hidden;
            }
            .container ul{
                width:${this.length * this.data.length + 2 * this.length}px;
                position: absolute;
                top:0;
                left: 0;
                height: ${this.height}px;
            }
            .container ul li {
                float: left;
                list-style: none;
            }
            .container ul li a{
                text-decoration: none;
            }
            .btn_right,.btn_left{
                position: absolute;
                top:50%;
                margin-top:-22.5px;
                cursor:pointer;
                transition:all .3s;
                opacity:.8;
            }
            .btn_left:hover img{
                width:110%;
                height:110%;
                opacity:1;
            }
            .btn_right:hover img{
                width:110%;
                height:110%;
                opacity:1;
            }
            .btn_right{
                right:10px;
            }
            .btn_left{
                left:10px;
            }
        `
            document.querySelector('head').appendChild(this.styleNode)
            this.fun()
        },
        // 做个小手脚
        fun: function () {
            this.cloneNode = document.querySelectorAll('.banner .container ul li')[0].cloneNode(true)
            this.cloneNodePre = document.querySelectorAll('.banner .container ul li')[this.data.length - 1].cloneNode(true)

            this.oUlNode.appendChild(this.cloneNode)
            this.oUlNode.insertBefore(this.cloneNodePre, document.querySelector('.banner .container ul li'))

            this.oUlNode.style.left = - this.length + 'px'
            this.start()
        },
        // dom操作
        start: function () {
            this.left = document.querySelector('.btn_left')
            this.right = document.querySelector('.btn_right')
            var n = -1;
            var _this = this;
            this.left.onclick = function () {
                if (n === -1) {
                    _this.oUlNode.style.left = -(_this.length * (_this.data.length + 1)) + 'px'
                    n = -(_this.data.length + 1)
                }
                n++
                _this.animate(_this.oUlNode, {
                    'left': n * _this.length
                })
            }
            this.right.onclick = function () {
                if (n === -(_this.data.length)) {
                    _this.oUlNode.style.left = 0 + 'px'
                    n = 0
                }
                n--
                _this.animate(_this.oUlNode, {
                    'left': n * _this.length
                })
            }
        },
        // 动画函数封装
        animate: function (ele, json) {
            function startMov(obj, json, fn) {
                clearInterval(obj.timer);//执行动画之前清除动画
                var flag = true;//是否动画都完成了
                obj.timer = setInterval(function () {
                    for (var attr in json) {
                        var icur = 0;
                        if (attr == 'opacity') {
                            icur = Math.round(parseFloat(getStyle(obj, attr)) * 100);//转换成整数,并且四舍五入下
                            //计算机在计算小数的时候往往是不准确的！
                        }
                        else {
                            icur = parseInt(getStyle(obj, attr));
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
            }

            function getStyle(obj, attr) {
                if (window.getComputedStyle) {
                    return window.getComputedStyle(obj)[attr]
                } else {
                    return obj.currentStyle[attr]
                }
            }
            startMov(ele, json)
        }
    }
    window.WuSowind = WuSowind
})(window)
