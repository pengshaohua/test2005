//1.提交数据：form+name+submit

//2.用户名重名检测 - 输入用户名失去焦点时，返回结果。
const username = $('.username');
username.onblur = function() {
    let ajax = new XMLHttpRequest();
    ajax.open('post', 'http://localhost/JS2005/Day%2022_ajax/loginregistry/php/reg.php', true);
    ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    ajax.send('name=' + this.value);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4) {
            if (!ajax.responseText) { //不存在，可以注册
                $('span').innerHTML = '√';
                $('span').style.color = 'green';
            } else { //存在
                $('span').innerHTML = '该用户名已被注册';
                $('span').style.color = 'red';
            }
        }
    }
}