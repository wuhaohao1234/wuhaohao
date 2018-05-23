
var bigLi = $('.bigLi')
var container = $('.container');
var oUl = $('ul')[0]
//下拉菜单
$.dropdown(bigLi, container)

// 轮播图
var leftBtn = $('.left_btn')[0],
    rightBtn = $('.right_btn')[0],
    oSowingUl = $('.sowing_ul')[0],
    length = 1230;
oSowingUl.style.width = 1230 * 5 + 'px'
$.Carousel(oSowingUl, leftBtn, rightBtn,length)

$('button').on('click',function () {
    window.location.href = "./demo3.html";
})
    