! function() {
    class Cartlist {
        constructor() {
            this.itemlist = document.querySelector('.item-list');
        }

        init() {
            //cookie存在，获取cookie，转换成数组
            if (cookie.get('cookiesid') && cookie.get('cookienum')) {
                let arrsid1 = cookie.get('cookiesid').split(','); //[3,4,5]
                let arrnum1 = cookie.get('cookienum').split(','); //[40,155,50]
                for (let i = 0; i < arrsid1.length; i++) {
                    this.rendercartlist(arrsid1[i], arrnum1[i]);
                }

            }
        }


        rendercartlist(sid, num) { //sid:传入的sid   num:数量。
            $ajax({
                url: 'http://localhost/JS2005/Day%2027_cart/cart/php/alldata.php'
            }).then((data) => {
                let arrdata = JSON.parse(data); //数组
                console.log(arrdata);
                for (let value of arrdata) {
                    if (value.sid == sid) {
                        let strhtml = '';
                        strhtml += `
                                <div class="goods-item goods-item-sele" style="display: block;">
                                <div class="goods-info">
                                    <div class="cell b-checkbox">
                                        <div class="cart-checkbox">
                                            <input type="checkbox" checked="" name="" id="" value="" />
                                            <span class="line-circle"></span>
                                        </div>
                                    </div>
                                    <div class="cell b-goods">
                                        <div class="goods-name">
                                            <div class="goods-pic">
                                                <a href=""><img src="${value.url}" alt="" /></a>
                                            </div>
                                            <div class="goods-msg">
                                                <div class="goods-d-info">
                                                    <a href="">${value.title}</a>
                                                </div>
                                                <div class="goods-ex">
                                                    <span class="promise"></span>
                                                    <span class="promise">
                                                        <i></i><a href="">购买京东服务</a>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="cell b-props">
                                        <div class="prop-text"></div>
                                    </div>
                                    <div class="cell b-price">
                                        <strong>￥${value.price}</strong>
                                        <a class="sales-promotion" href="">
                                            促销优惠
                                            <b></b>
                                        </a>
                                        <div class="sales-promotion-dropdown">
                                        </div>
                                    </div>
                                    <div class="cell b-quantity">
                                        <div class="quantity-form">
                                            <a class="quantity-down" href="javascript:void(0)">-</a>
                                            <input type="text" value="${num}" />
                                            <a class="quantity-add" href="javascript:void(0)">+</a>
                                        </div>
                                        <div class="quantity-text">有货</div>
                                    </div>
                                    <div class="cell b-sum">
                                        <strong>${(num*value.price).toFixed(2)}</strong>
                                    </div>
                                    <div class="cell b-action">
                                        <a href="javascript:void(0)">删除</a>
                                    </div>
                                </div>
                            </div>
                        `;

                        this.itemlist.innerHTML += strhtml;
                    }
                }
            })

        }
    }

    new Cartlist().init();
}();