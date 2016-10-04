/**
 * Created by harttle on 1/7/15.
 */

var router = require('express').Router();
var Post = require('../models/post.js');
var authRequired = require('../utils/auth-required');
var User = require('../models/user.js');
var Comment = require('../models/comment.js');
require('mongoose-query-paginate');

router.get('/', authRequired, function (req, res, next) {
    res.redirect('/user/' + req.user.id);
});

router.get('/', function (req, res, next) {
    User.find({}, function (err, users) {
        if (err) return next(err);

        var options = {
            perPage: 5,
            delta: 3,
            page: req.query.page || 1
        };
        Post.find({})
            .sort({_id:-1})
            .skip(8)
            .paginate(options , function (err, pager) {
                if (err) return next(err);
                res.render('home/index', {
                    pager: pager,
                    users: users
                });
            })
    });
});

router.get('/home/lend', function (req, res, next) {
    res.render('home/index',{
         title : '借款'
    })
})
router.get('/home/explore', function (req, res, next) {
     res.render('home/explore',{
          title : '探索'
     })
})
router.get('/home/profile', function (req, res, next) {
    res.render('home/profile',{
        title : '主页',
        username: '颜卿',
        userphonenum : '15800984101'
    })
})
router.get('/home/user', function (req, res, next) {
    res.render('home/user',{}
    )
})

router.get('/home', authRequired, function (req, res, next) {
    res.redirect('/user/' + req.user.id);
});

router.get('/home/lend', authRequired, function (req, res, next) {
    res.redirect('/user/' + req.user.id);
});
router.get('/user/:id', function (req, res, next) {
    User.findById(req.params.id, function (err, author) {
        if (err || !author) return next(err);

        var cond = {author: req.params.id};

        var options = {
            perPage: 5,
            delta: 3,
            page: req.query.page || 1
        };


        Post.find(cond)
            .sort({_id: -1})
            .paginate(options, function (err, pager) {
                if (err) return next(err);
                res.render('home/user', {
                    pager: pager,
                    title: author.username + ' 的首页',
                    author: author
                });
            });
    });
});

router.route('/post/:id')
    .get(function (req, res, next) {
        Post.findById(req.params.id)
            .populate('author comments')
            .exec(function (err, post) {
                if (err) return next(err);

                Comment.populate(post.comments, 'author');
                res.render('home/post', {
                    post: post,
                    title: post.title,
                    author: post.author
                });
            });
    })
    .post(authRequired, function (req, res, next) {
        Post.findById(req.params.id, function (err, post) {
            if (err) return next(err);

            var comment = new Comment({author: req.user.id, content: req.body.content});
            comment.save(function (err, comment) {
                if (err) return next(err);

                post.comments.push(comment.id);
                post.save(function (err, post) {
                    if (err) return next(err);

                    res.send({author: req.user.username, content: comment.content});
                });
            });
        });
    });




router.route('/detail/:id')
    .get(function (req, res, next) {
        Post.findById(req.params.id)
            .populate('author comments')
            .exec(function (err, post) {
                if (err) return next(err);

                Comment.populate(post.comments, 'author');
                res.render('home/detail', {
                    post: post,
                    title: post.title,
                    author: post.author
                });
            });
    })
    .post(authRequired, function (req, res, next) {
        Post.findById(req.params.id, function (err, post) {
            if (err) return next(err);

            var comment = new Comment({author: req.user.id, content: req.body.content});
            comment.save(function (err, comment) {
                if (err) return next(err);

                post.comments.push(comment.id);
                post.save(function (err, post) {
                    if (err) return next(err);

                    res.send({author: req.user.username, content: comment.content});
                });
            });
        });
    });


module.exports = router;