function $ajax(option) { //参数较多，对象传参
    let promise = new Promise(function(resolve, reject) {
        //1.判断请求方式。默认get
        option.type = option.type || 'get';
        let ajax = new XMLHttpRequest();
        //2.判断地址 - 地址不能为空。
        if (!option.url) {
            throw new Error('接口地址不能为空，请输入接口地址');
        }
        //3.是否异步：false或者'false'代表同步，其他的都是异步。
        if (option.async === false || option.async === 'false') {
            option.async = false;
        } else {
            option.async = true;
        }
        //4.传输数据:判断数据存在，数据的类型为对象
        if (option.data) { //数据存在
            if (Object.prototype.toString.call(option.data).slice(8, -1) === 'Object') { //对象 
                let arr = [];
                for (let i in option.data) {
                    arr.push(i + '=' + option.data[i]);
                }
                option.data = arr.join('&');
            }
        }

        //5.数据存在并且是get请求 - 拼接地址栏
        if (option.data && option.type === 'get') {
            option.url += '?' + option.data
        }

        ajax.open(option.type, option.url, option.async);

        //5.数据存在并且是post请求 - 数据存放send中以及设置请求头
        if (option.data && option.type === 'post') {
            ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
            ajax.send(option.data);
        } else {
            ajax.send();
        }

        //3.是否异步的操作,同步无需监听，异步才监听
        if (option.async) {
            ajax.onreadystatechange = function() {
                if (ajax.readyState === 4) {
                    if (ajax.status === 200) { //请求成功
                        //利用回调函数进行数据获取
                        let jsondata = null;
                        if (option.dataType === 'json') { //检查json格式
                            jsondata = JSON.parse(ajax.responseText);
                        } else {
                            jsondata = ajax.responseText
                        }
                        resolve(jsondata);
                    } else {
                        reject('接口地址有误');
                    }
                }
            }
        } else {
            if (ajax.status === 200) { //请求成功
                //利用回调函数进行数据获取
                let jsondata = null;
                if (option.dataType === 'json') { //检查json格式
                    jsondata = JSON.parse(ajax.responseText);
                } else {
                    jsondata = ajax.responseText
                }
                resolve(jsondata);
            } else {
                reject('接口地址有误');
            }
        }
    });
    return promise;
}