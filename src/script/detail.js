;
! function() {
    function $(selector, all) { //selector:选择器  all：获取多个设置
        if (!all) {
            return document.querySelector(selector);
        } else {
            return document.querySelectorAll(selector);
        }
    }
    class Detail {
        constructor() {
            //获取sid
            this.sid = location.search.substring(1).split('=')[1];
            this.arrsid = []; //商品sid
            this.arrnum = []; //商品数量
            this.spic = $('#spic'); //小图
            this.bpic = $('#bpic'); //大图
            this.sf = $('#sf'); //小放
            this.bf = $('#bf'); //小放
            this.wrap = $('.wrap'); //父元素。
        }
        init() {
            this.render(); //调用渲染。
            this.runcart(); //购物车
            this.scale(); //放大镜效果
        }
        render() { //渲染
            $ajax({
                type: 'post',
                url: 'http://localhost/JS2005/Day%2027_cart/cart/php/getsid.php',
                data: {
                    sid: this.sid //传给后端
                }
            }).then(function(data) { //获取返回值
                let dataobj = JSON.parse(data);
                console.log(dataobj.piclisturl.split(','));
                $('#spic img').src = dataobj.url;
                $('.loadtitle').innerHTML = dataobj.title;
                $('.loadpcp').innerHTML = dataobj.price;
                $('#bpic').src = dataobj.url;
                let listpic = dataobj.piclisturl.split(',');
                let strhtml = '';
                for (let value of listpic) {
                    strhtml += `<li><img src="${value}"/></li>`;
                }
                $('#list ul').innerHTML = strhtml;

            })
        }

        runcart() {
            //1.购物车核心思路：存储的是商品sid和数量。


            //2.当前的按钮是第一次还是多次点击，第一次创建商品列表，后面再点击数量累计。
            //依赖cookie进行判断。
            //先获取cookie里面的数量和sid，将其转换成数组进行判断。
            //提前约定cookie的key的值  cookiesid cookienun
            let _this = this;

            function cookietoarray() {
                if (cookie.get('cookiesid') && cookie.get('cookienum')) {
                    _this.arrsid = cookie.get('cookiesid').split(',');
                    _this.arrnum = cookie.get('cookienum').split(',');
                } else {
                    _this.arrsid = [];
                    _this.arrnum = [];
                }
            }

            $('.p-btn a').onclick = () => {
                cookietoarray();
                //获取cookie里面的sid，将其转换成数组arrsid。
                //再获取当前商品的sid，用当前的sid和arrsid进行比较，确认当前sid是否存在arrsid。
                //如果存在，不是第一次，否则第一次。
                if (this.arrsid.indexOf(this.sid) === -1) { //第一次
                    this.arrsid.push(this.sid);
                    cookie.set('cookiesid', this.arrsid, 7);
                    this.arrnum.push($('#count').value);
                    cookie.set('cookienum', this.arrnum, 7);
                } else { //多次
                    //获取前面添加的数量+当前的数量
                    //获取this.sid对应得位置。
                    let index = this.arrsid.indexOf(this.sid);
                    let count = parseInt(this.arrnum[index]) + parseInt($('#count').value);
                    //一起存入cookie
                    this.arrnum[index] = count;
                    cookie.set('cookienum', this.arrnum, 7);
                }
                alert('加入购物车成功');
            };

        }

        scale() {
            //1.鼠标移入移出小图，显示小放和大放
            this.spic.onmouseover = () => {
                this.sf.style.visibility = 'visible';
                this.bf.style.visibility = 'visible';

                //2.求小放的尺寸和比例
                this.sf.style.width = this.spic.offsetWidth * this.bf.offsetWidth / this.bpic.offsetWidth + 'px';
                this.sf.style.height = this.spic.offsetHeight * this.bf.offsetHeight / this.bpic.offsetHeight + 'px';

                //比例>1
                this.bili = this.bpic.offsetWidth / this.spic.offsetWidth;

                //3.鼠标移动
                this.spic.onmousemove = (ev) => {
                    var ev = ev || window.event;
                    let leftvalue = ev.clientX - this.wrap.offsetLeft - this.sf.offsetWidth / 2;
                    let topvalue = ev.clientY - this.wrap.offsetTop - this.sf.offsetHeight / 2;
                    if (leftvalue <= 0) {
                        leftvalue = 0;
                    } else if (leftvalue >= this.spic.offsetWidth - this.sf.offsetWidth) {
                        leftvalue = this.spic.offsetWidth - this.sf.offsetWidth;
                    }
                    if (topvalue <= 0) {
                        topvalue = 0;
                    } else if (topvalue >= this.spic.offsetHeight - this.sf.offsetHeight) {
                        topvalue = this.spic.offsetHeight - this.sf.offsetHeight;
                    }
                    this.sf.style.left = leftvalue + 'px';
                    this.sf.style.top = topvalue + 'px';

                    this.bpic.style.left = -this.bili * leftvalue + 'px';
                    this.bpic.style.top = -this.bili * topvalue + 'px';
                };
            };

            this.spic.onmouseout = () => {
                this.sf.style.visibility = 'hidden';
                this.bf.style.visibility = 'hidden';
            };

            //4.事件委托。
            $('#list ul').onclick = (ev) => {
                var ev = ev || event;
                let element = ev.target || ev.srcElement;
                if (element.nodeName === 'IMG') {
                    // element.src//当前点击的图片的地址
                    $('#spic img').src = element.src;
                    this.bpic.src = element.src;
                }
            }

            //5.左右箭头添加点击事件。
            let num = 6; //小图显示的目标数量。

            $('#right').onclick = function() {
                let liwidth = $('#list ul li', true)[0].offsetWidth;
                if ($('#list ul li', true).length > num) {
                    num++;
                    $('#left').style.color = '#333';
                    if (num === $('#list ul li', true).length) {
                        this.style.color = '#fff';
                    }
                    bufferMove($('#list ul'), { left: -liwidth * (num - 6) });
                }
            };
            $('#left').onclick = function() {
                let liwidth = $('#list ul li', true)[0].offsetWidth;
                if (num > 6) {
                    num--;
                    $('#right').style.color = '#333';
                    if (num === 6) {
                        this.style.color = '#fff';
                    }
                    bufferMove($('#list ul'), { left: -liwidth * (num - 6) });
                }
            };
        }


    }

    new Detail().init();
}();