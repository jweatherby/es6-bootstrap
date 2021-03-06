var settings = require('../../settings');
var bows = require('bows');

// api utils for querying
var api = require('../api');
var userMaps = require('./maps');

var logger = bows('api.users');

var views = {
    register: function*(req, res){
        var userFound=false,
            newUser = {
                username: req.body.username,
                password: req.body.password
            };

        var exists = yield api.async({
            url: '/users?username='+newUser.username,
            method: 'get',
        });

        if(exists.data.length)
            return res.json({errors:'User already exists'});

        var response = yield api.async({
            url: '/users',
            method: 'post',
            params: newUser
        });
        return res.json(response.data);
    },

    login: function*(req, res){
        var userFound = false,
            username = req.body.username,
            password = req.body.password;

        // check that the username+password exists
        var response = yield api.async({
            url: '/users?username=' + username,
            method: 'get',
        });

        if(response.data.length && response.data[0].password == password) {
            var user = userMaps.buildUser(response.data[0]);
            var one_week = new Date(Date.now() + (24*60*60*1000*7));
            res.cookie('currUser', user, one_week);
            res.json({
                user: user
            });
        } else {
            res.json({
                errors: 'User not found'
            });
        }
        done();
    },

    logout: function(req, res){
        res.clearCookie('currUser');
        res.json({done: true});
    }
};

module.exports = views;
