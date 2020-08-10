function getStyle(obj, attr) {
    if (window.getComputedStyle) {
        return window.getComputedStyle(obj)[attr];
    } else {
        return obj.currentStyle[attr];
    }
}

function bufferMove(obj, attrobj, fn) { //obj:元素对象 attrobj:属性对象  fn:回调函数
    var speed = 0;
    clearInterval(obj.timer); //obj.timer:每一次的返回都不一样。
    obj.timer = setInterval(function() {
        //对传入的属性对象进行遍历
        var flag = true; //运动完成的标记
        for (var attr in attrobj) {
            //1.求速度-透明度不能取整
            var currentvalue = null;
            if (attr === 'opacity') { //透明度
                currentvalue = Math.round(getStyle(obj, attr) * 100); //扩大100倍
            } else {
                currentvalue = parseInt(getStyle(obj, attr)); //当前改变属性值
            }

            //如果是透明度，目标扩大100倍
            speed = (attrobj[attr] - currentvalue) / 10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
            //2.判断运动是否停止
            if (currentvalue !== attrobj[attr]) { //没到目标点继续运动
                if (attr === 'opacity') { //继续运动 判断透明度，透明度没有单位。
                    obj.style.opacity = (currentvalue + speed) / 100;
                    obj.style.filter = 'alpha(opacity=' + (currentvalue + speed) + ')';
                } else {
                    obj.style[attr] = currentvalue + speed + 'px';
                }
                flag = false; //继续运动,改变flag的值
            }
        }

        if (flag) { //如果flag=true，运动已经结束啦，如果有一个没到，flag=false
            clearInterval(obj.timer);
            //fn链式运动，不是每一个运动都是链式的，判断是否存在第四个参数。
            fn && typeof fn === 'function' && fn();
        }


    }, 1000 / 60);
}