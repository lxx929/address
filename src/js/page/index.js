require(['../js/config.js'], function() {
    require(['ajax', 'BScroll', 'mui'], function(ajax, BScroll, mui) {
        BS = null;


        function init() {
            mui.init();
            BS = new BScroll('section', {
                click: true,
                scrollBar: true,
                probeType: 2
            });
            ajaxData();

            actEvent();
            addEvent();
            updataEvent();
        }

        function updataEvent() {
            mui('#list').on('tap', '#updata', function() {
                let that = this;
                mui.ajax('/api/findData', {
                    data: {
                        _id: that.getAttribute('data-id')
                    },
                    success: function(rs) {
                        if (rs.code) {
                            location.href = "../../page/updata.html?_id=" + that.getAttribute('data-id');
                        }
                    }
                });

            });
        }

        function addEvent() {
            addAddress.addEventListener('tap', function() {
                location.href = '../../page/add.html';
            });
        }

        function actEvent() {
            const address = [...document.querySelectorAll('#list>.box')];
            mui('#list').on('tap', '#confirmBtn', function() {
                var btnArray = ['取消', '确认'];
                console.log(this.getAttribute('data-id'))
                let that = this;
                mui.confirm('您确定要删除该地址吗？', '提示', btnArray, function(e) {
                    if (e.index == 1) {
                        mui.ajax('/api/delData', {
                            data: {
                                _id: that.getAttribute('data-id')
                            },
                            success: function(rs) {
                                if (rs.code) {
                                    console.log('shan')
                                }
                            }
                        });
                        that.parentNode.parentNode.parentNode.style.display = "none";

                    } else {
                        console.log(2);
                        return;
                    }
                })
            });
        }

        function ajaxData() {
            mui.ajax('/api/getData', {
                success: function(rs) {
                    if (rs.code) {
                        renderData(rs.data);
                    }
                }
            })
        }

        function renderData(data) {
            console.log(data);
            const list = document.querySelector('#list');
            list.innerHTML = data.map(item => {
                return `<div class="box">
                            <div class="top">
                                <h4>${item.name}</h4>
                                <span>${item.tel}</span>
                            </div>
                            <div class="center">
                                ${item.title}
                            </div>
                            <div class="bot">
                                <div class="bot_left">
                                    <input type="checkbox" name="" id=""> 设为默认
                                </div>
                                <div class="bot_right">
                                    <button id='confirmBtn' type="button" data-id="${item._id}" " class="mui-btn mui-btn-blue mui-btn-outlined">删除</button>
                                    <button id="updata" data-id="${item._id}">修改</button>
                                </div>
                            </div>
                        </div>`;
            }).join("");
            BS.refresh();
        }

        init()
    });
});