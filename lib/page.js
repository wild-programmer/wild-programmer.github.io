$('#dowebok').fullpage({
    //  'sectionsColor': ['#847942', '#042359', 'blue'],
    'sectionsColor': ['white', '#042359' ],
    // 设置锚点 （哈希）
    'anchors': ['page1', 'page2'],
    // 无缝滚动
    'continuousVertical': true,
    'navigation': true,
    // 侧边导航的位置 
    'navigationPosition': 'right',
    'afterLoad': function() {

    }
})

//     'sectionsColor': ['white', '#042359', 'blue'],
//     'anchors': ['page1', 'page2', 'page3'],

// page1
$().ready(function() {
    $(function() {
        var step = 0,
            keydown = 0,
            top = 0,
            step2 = 0;
        setInterval(function() {
            if (step > 3) {
                if (step2 > 2) {
                    step = 0;
                    step2 = 0;
                } else {
                    $('.luozi_img').css('background-position', '-' + 138 * step2 + 'px -120px')
                    step2++;
                }
            } else {
                $('.luozi_img').css('background-position', '-' + 138 * step + 'px 0')
                step++;
            }
        }, 180)
        $(document.body).on('keydown', function(event) {
            if (event && event.keyCode == 65) {
                if (keydown > Math.floor($(window).width() / 50)) {
                    keydown = 0;
                }
                keydown++;
                $('.luozi_img').css({
                    transform: 'rotateX(0deg)',
                    right: '' + 50 * keydown + 'px'
                })
            } else if (event && event.keyCode == 68) {
                if (keydown < 0) {
                    keydown = Math.floor($(window).width() / 50);
                }
                keydown--;
                $('.luozi_img').css({
                    transform: 'rotateY(180deg)',
                    right: '' + 50 * keydown + 'px',
                })
            } else if (event && event.keyCode == 83) {
                // 向下走
                if (top < 200) {
                    top += 10;
                }
                if (top % 50 == 0) {
                    keydown++;
                }

                $('.luozi_img').css({
                    transform: 'rotateX(.15deg)',
                    right: '' + (50 * keydown + top) + 'px',
                    top: '' + top + 'px'
                })
            } else if (event && event.keyCode == 87) {
                if (top > -200) {
                    top -= 6;
                }
                if (top % 50 == 0) {
                    keydown++;
                }
                //  if (keydown > Math.floor($(window).width() / 50)) {
                //      keydown = 0;
                //  }
                $('.luozi_img').css({
                    top: '' + top + 'px',
                    transform: 'rotateX(-.09deg)',
                    right: '' + (50 * keydown + (-top)) + 'px',
                })
            }

        })

        // 思路：当我们点击按钮的时候，需要设置一个增量去rotate
        var total = 0; // 增量
        var rightBtn = $('.right_btn'); // 将元素缓存起来 ，不要让他每一次都去查找这个元素
        var items = $('.items');
        var leftBtn = $('.left_btn');
        // 设置一个开关变量
        var flag = true;
        rightBtn.click(function() {
            if (flag) {
                flag = false;
                // 累加增量
                total += 90;
                //通过过渡的延迟属性去实现延迟执行过渡
                items.each(function(index, el) {
                    items.eq(index).css({
                        'transform': 'rotateX(' + total + 'deg)',
                        'transition': 'all 1s ' + index * 200 + 'ms'
                    });
                });
            }
        });
        // 由于用户暴力点击 导致过渡执行不完全，会造成不好的体验，所以要控制
        // 控制的思路 通过一个开关去控制用户的点击
        // 最后一个ul过渡完毕之后执行的事件
        items.last().on('transitionend', function(argument) {
            flag = true;
        });
        leftBtn.click(function() {
            // 累减增量
            total -= 90;
            items.css('transform', 'rotateX(' + total + 'deg)');

        });
    })
})

// page2
$(function() {
    var _left, _top = '650px',
        $el = $('#falling');
    _left = $el.offset().left + 'px';
    $('.page_btn').on('click', function() {
        $('.content_right >div').css('display', 'none').filter('.' + $(this).attr('data-ID') + '').css('display', 'block');
    })
    $('.stars >span').on('click', function() {
        $(this).animate({
            left: _left,
            top: _top,
            opacity: .3
        }, 1500);
    })
    $('.birthday').on('mouseenter', function() {
        $('.sun>span>i').animate({
            right: 0
        }, 1500);
    });
    $('.birthday').on('mouseleave', function() {
        $('.sun>span>i').animate({
            right: '-256px'
        }, 1500);
    });
})
