require(['../js/config.js'], function() {
    require(['ajax', 'BScroll', 'mui'], function(ajax, BScroll, mui) {


        function init() {
            mui.init();
            dates();

        }

        function dates() {


            let search = location.search.slice(1).slice(4);
            mui.ajax('/api/findData', {
                data: {
                    _id: search
                },
                success: function(rs) {
                    if (rs.code) {
                        console.log(rs.data);
                        rs.data.map(function(v) {

                            console.log(v);
                            names.innerHTML = v.name;
                            tel.innerHTML = v.tel;
                            address.innerHTML = v.title;
                        });

                    }
                }
            });


            addAddress.addEventListener('tap', function() {
                mui.ajax('/api/upData', {
                    data: {
                        _id: search,
                        name: names.innerHTML,
                        tel: tel.innerHTML,
                        title: address.innerHTML
                    },
                    success: function(rs) {
                        if (rs.code) {
                            console.log('success');
                            location.href = "../../index.html";
                        } else {
                            location.href = "../../index.html";
                        }
                    }
                })
            });



        }


        init()
    });
});