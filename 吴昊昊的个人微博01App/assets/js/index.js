
var canvas = $('canvas')[0],
    img = document.createElement('img'),
    summary = $('.summary')[0],
    register = $('button')[0],
    logins = $('button')[1],
    skip = $('button')[2],
    loginZc = $('.login_zc')[0],
    form = $('form'),
    login_zc = $('button')[3],
    login_dl = $('button')[4],
    arr = [];
img.src = './assets/images/xuehua.png';
// 弹出框
summary.onclick = function (ev) {
    var ev = ev || window.event
    var target = ev.target || ev.srcElement
    if (target == register) {
        $.alerts(summary, loginZc, form,false)
    }
    if (target == logins) {
        $.alerts(summary, loginZc, form,true)
    }
    if (target == skip) {
        window.location.href = "./www/demo2.html";
    }
}
// 注册登录框
$(login_zc).on('click',function () {
    var url = 'http://localhost:80'
    $.loggin()
})
$(login_dl).on('click', function () {
    var url = 'http://localhost:80'
    $.loggin()
})
$('input').blur(function () {
    arr.push($.Prooftest(this))
})
// canvas
$.canvas2(canvas, img)
$.canvas(".start", 230, 1000, 60, 2, 50000, 0.5);