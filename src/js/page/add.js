require(['../js/config.js'], function() {
    require(['ajax', 'BScroll', 'mui'], function(ajax, BScroll, mui) {



        function init() {
            mui.init();
            addData();

        }

        function addData() {

            addAddress.addEventListener('tap', function() {
                const nameVal = document.querySelector('#name').value.trim();
                const telVal = document.querySelector('#tel').value.trim();
                const addressVal = document.querySelector('#address').value.trim();
                if (nameVal == "" || telVal == "" || addressVal == "") {
                    alert("以下都不能为空");
                }
                mui.ajax('/api/addData', {
                    data: {
                        name: nameVal,
                        tel: telVal,
                        title: addressVal
                    },
                    success: function(rs) {
                        if (rs.code) {
                            console.log('success');
                            location.href = "../../index.html";
                        }
                    }
                })

            });

        }


        init()
    });
});