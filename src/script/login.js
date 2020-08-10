//1.将用户名和密码同时传给后端。

$('.btn').onclick = function() {
    let ajax = new XMLHttpRequest();
    ajax.open('post', 'http://localhost/JS2005/Day%2022_ajax/loginregistry/php/login.php', true);
    ajax.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    ajax.send(`username=${$('.username').value}&password=${hex_sha1($('.password').value)}`);
    ajax.onreadystatechange = function() {
        if (ajax.readyState === 4) {
            if (!ajax.responseText) {
                $('.password').value = '';
                alert('用户名或者密码错误');
            } else {
                //利用本地存储，将用户名存储下来
                localStorage.setItem('username', $('.username').value);
                location.href = 'index.html';
            }
        }
    }
}