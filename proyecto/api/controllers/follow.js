'use strict'

// var path = require('path');
// var fs = require ('fs');
var mongoosePaginate = require ('mongoose-pagination');

var User = require('../models/user');
var Follow = require('../models/follow');

function saveFollow(req, res){
    var params = req.body;

    var follow = new Follow();
    follow.user = req.user.sub;
    follow.followed = params.followed;

    follow.save()
    .then((followStored) =>{
        return res.status(200).send({ follow: followStored});
    })
    .catch((err) =>{
        return res.status(500).send({ message: 'Error al guardar el seguimiento git'});
    });
    }

module.exports = {
    saveFollow
}