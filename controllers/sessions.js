const db= require("../database")
const {login}=require('../helpers/login');
const io = require('socket.io-client');

let socket= io.connect('http://localhost:3000',{reconnect:true});
module.exports={
    new: function(req,res){
        res.render('sessions/new');
    },
    create: function(req,res){
        login(req.body.username,req.body.password)
        .then(user=>{
            if(user){
                req.session.userId=user.id;//Por este medio obtiene la session el programa.
            }
            res.json(user);
        })
        .catch(err=>{
            console.log(err);
            res.json(err);
        });
    },
    destroy: (req,res)=>{
        req.session.destroy(()=>{
            res.redirect('/sessions')
        });
    },
    boton:(req,res)=>{
        res.render('sockets');
    }
}