var express = require('express');
var router = express.Router();
var query_async = require('../db');
var fs = require("fs");

var path = require('path')
var formidable = require('../../node_modules/formidable');


router.get("/getList", async (req, res) => {
    const arr = [-1]
    // 1. 检查是否已登录
    if (req.session.user_id !== undefined) {
        arr.push(req.session.user_id)
    }
    const response = {
        status: 0,
        msg: 'success',
        data: {

        }
    }
    // 获取图片列表
    for (let i = 0; i < arr.length; i++) {
        let sql = `SELECT * FROM galary WHERE owner = ${arr[i]}`
        response.data[arr[i]] = await query_async(sql)
    }

    res.json(response)
});

router.post("/upload", async (req, res) => {
    // 1. 检查是否已登录
    if (req.session.user_id === undefined) {
        res.json({ status: 100, msg: "用户未登录无法上传", data: null });
        return;
    }

    // 
    const user_id = req.session.user_id;
    var form = new formidable.IncomingForm();
    form.encoding = 'utf-8';
    form.uploadDir = path.join(__dirname + "/../../public/images/bgs");
    form.keepExtensions = true;//保留后缀
    form.maxFieldsSize = 20 * 1024 * 1024;

    //处理图片
    form.parse(req, async function (err, fields, files) {
        // var filename = files.name
        var filename = Object.keys(files)[0]
        var nameArray = filename.split('.');
        var type = nameArray[nameArray.length - 1];
        var name = '';
        for (var i = 0; i < nameArray.length - 1; i++) {
            name = name + nameArray[i];
        }
        var date = new Date();
        var time = date.getFullYear() + "_" + date.getMonth() + "_" + date.getDay() + "_" + date.getHours() + "_" + date.getMinutes();
        var avatarName = user_id + "_"  + time + parseInt(Math.random() * 1000000) + '.' + type;
        var newPath = form.uploadDir + "/" + avatarName;
        fs.renameSync(files[filename].path, newPath);  //重命名

        /**
         * 写入数据库
         */
        let sql = `INSERT INTO galary(pic_name, owner) VALUES('${avatarName}', ${req.session.user_id})`;
        await query_async(sql)
        res.json({
            status: 0, msg: '上传成功', data: {
                filename: avatarName
            }
        })
    })

});


router.get("/delete", async (req, res) => {
    // 1. 检查是否已登录
    if (req.session.user_id === undefined) {
        res.json({
            status: 100,
            msg: "未登录，无权限执行",
            data: null
        });
        return
    }
    const { id } = req.query
    if (!id) {
        res.json({
            status: 101,
            msg: `请求参数缺失： id(${id})`,
            data: null
        })
        return
    }

    let sql = `SELECT * FROM galary WHERE galary_id = ${id} AND owner = ${req.session.user_id}`
    let query_res = await query_async(sql)
    if (query_res.length === 0) {
        res.json({
            status: 102,
            msg: `id（${id}）有误，或当前登录的用户(id${req.session.user_id})没有权限操作该图片`,
            data: null
        })
        return
    }

    // 执行删除
    sql = `DELETE FROM galary WHERE galary_id = ${id} AND owner = ${req.session.user_id}`
    await query_async(sql)

    res.json({
        status: 0,
        msg: '删除成功'
    })

});

module.exports = router;
