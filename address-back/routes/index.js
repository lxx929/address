var express = require('express');
var router = express.Router();
var Mongo = require('mongodb-curd');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/api/getData', function(req, res, next) { //查数据
    Mongo.find('address', 'info', function(result) {
        if (result) {
            res.send({ code: 1, data: result, mes: "success" });
        } else {
            res.send({ code: 0, mes: "error" });
        }
    });
});

router.get('/api/addData', function(req, res, next) { //加数据
    let { name, tel, title } = req.query;
    if (!name || !tel || !title) {
        res.send({ code: 2, mes: "参数不完整" });
    }
    Mongo.insert('address', 'info', req.query, function(result) {
        if (result) {
            res.send({ code: 1, data: result, mes: "success" });
        } else {
            res.send({ code: 0, mes: "error" });
        }
    });
});

router.get('/api/delData', function(req, res, next) { //删数据 
    let { _id } = req.query;
    if (!_id) {
        res.send({ code: 2, mes: "参数不完整" });
    }
    Mongo.remove('address', 'info', { _id: _id }, function(result) {
        if (result) {
            res.send({ code: 1, data: result, mes: "success" });
        } else {
            res.send({ code: 0, mes: "error" });
        }
    });
});
router.get('/api/findData', function(req, res, next) { //查数据 
    let { _id } = req.query;
    if (!_id) {
        res.send({ code: 2, mes: "参数不完整" });
    }
    Mongo.find('address', 'info', { _id: _id }, function(result) {
        if (result) {
            res.send({ code: 1, data: result, mes: "success" });
        } else {
            res.send({ code: 0, mes: "error" });
        }
    });
});

router.get('/api/upData', function(req, res, next) { //改数据
    let { _id, name, tel, title } = req.query;
    if (!_id || !name || !tel || !title) {
        res.send({ code: 2, mes: "参数不完整" });
    }
    Mongo.update('address', 'info', req.query, function(result) {
        if (result) {
            res.send({ code: 1, data: result, mes: "success" });
        } else {
            res.send({ code: 0, mes: "error" });
        }
    });
});



module.exports = router;