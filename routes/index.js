
/*
 * GET home page.
 */
var crypto = require('crypto'),
    Filer= require('../models/qiniu.js');

module.exports = function(app) {

    app.get('/', function (req, res) {
        res.render('index', { title: 'update' });
    });

    app.post("/",function(req,res){
        console.log(req.body.name)
        var filer = new Filer({
            name: req.body.name,

            format: req.body.format
        });
        filer.update(function (err) {
            if (err) {
                return res.render('index', { title: 'update' });
            }
            res.render('index', { title: 'update' });
        })
    })

    app.get("/save",function(req,res){
        res.render('index', { title: 'save' });
    })

    app.post("/save",function(req,res){
        var filer = new Filer({
            name: req.body.name,
            format: req.body.format
        });
        filer.save(function (err) {
            if (err) {
                return res.render('index', { title: 'save' });
            }
           res.render('index', { title: 'save' });
        })
    })

    app.get("/remove",function(req,res){
        res.render('index', { title: 'remove' });
    })

    app.post("/remove",function(req,res){
        var filer = new Filer({
            name: req.body.name,
            format: req.body.format
        });
        filer.remove(function (err) {
            if (err) {
               return  res.render('index', { title: 'remove' });
            }
            res.render('index', { title: 'remove' });
        })
    })

    app.get("/get",function(req,res){
        res.render('index', { title: 'get' });
    })

    app.post("/get",function(req,res){
        var filer = new Filer({
            name: req.body.name,
            format: req.body.format
        });
        filer.get(function (err) {
            if (err) {
                return res.render('index', { title: 'get' });
            }
            res.render('index', { title: 'get' });
        })
    })
    app.post("/filersave",function(req,res){
        console.log("req"+req);
    })

};