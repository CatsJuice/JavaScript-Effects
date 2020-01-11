var express = require('express');
var router = express.Router();
var query_async = require('../db');

router.get("/signin", async (req, res) => {
    const { username, password } = req.query
    // 1. 检查请求的参数是否缺失
    if (username === undefined ||
        password === undefined) {
        res.json({ status: 100, msg: '请求参数缺失', data: null });
        return;
    }

    // 2. 查询用户的密码
    // 2.1 判断用户名是否存在
    sql = `SELECT * FROM user WHERE \`username\` = '${username}'`;
    let query_res = await query_async(sql);
    if (query_res.length == 0) {
        res.json({ status: 102, msg: '用户名不存在', data: null });
        return;
    }
    // 2.3 查询真实密码
    let password_true = query_res[0]['password']

    // 3. 登录
    // 3.1 判断当前用户是否已经登录， 避免重复登录
    if (req.session.user_id == query_res[0]['user_id']) {
        res.json({ status: 0, msg: `用户${query_res[0]['username']}已登录，请勿重复登录`, data: null });
        return;
    }

    // 3.2 判断密码是否正确
    if (req.query.password != password_true) {
        res.json({ status: 103, msg: '密码错误', data: null });
        return;
    }

    // 3.3. 密码正确进行登录
    let user_id = query_res[0]['user_id']
    req.session.user_id = user_id;
    res.json({
        status: 0,
        msg: "密码正确， 登录成功",
        data: {
            user_id: query_res[0]['user_id'],
            username: query_res[0]['username'],
        }
    })
});

router.get("/check", async (req, res) => {
    // 1. 检查是否有用户登录
    if (req.session.user_id == undefined) {
        res.json({ status: 100, msg: '用户未登录', data: null });
        return;
    }

    res.json({
        status: 0,
        msg: "用户已登录",
        data: {
            user_id: req.session.user_id
        }
    })
})

router.get("/signout", async (req, res) => {
    // 1. 校验当前用户是否已登录
    if (req.session.user_id == undefined) {
        res.json({ status: 101, msg: '用户未登录或已登录的用户不匹配', data: null });
        return;
    }

    // 2. 登出
    req.session.user_id = undefined;
    res.json({ status: 0, msg: '用户已登出', data: null });
})


module.exports = router;
