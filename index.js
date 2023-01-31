const express =require("express");
const bodyParser=require("body-parser");
const methodOverride=require('method-override');
const session=require('express-session');
const socketio=require('socket.io');
const authUser= require('./middleaware/auth_user');
const findUserMiddleware= require('./middleaware/find_user');
const usersRoutes=require('./routes/users_routes');
const sessionsRoutes=require('./routes/sessions_routes');
const mqtt = require('mqtt');
const app=express();
app.use(bodyParser.urlencoded({extended:true}));

//motores de vista
app.set('view engine','pug');
app.use(session({
    secret:['12dfaffadfasafafafaasdfaaf','adfafafdgfhdfhfsfa'],
    saveUninitialized:false,
    resave:false
}));
app.use(findUserMiddleware);
//app.use(authUser);

app.use(methodOverride('_method'));
app.use(usersRoutes);
app.use(sessionsRoutes);
app.get('/',function(req,res){
    res.render('home',{user:req.user});
});
const server=app.listen(process.env.PORT || 3000);

let io=socketio(server);

let sockets={};
let userCount=0;
io.on('connection',function(socket){

    let userId=socket.request._query.loggeduser;
    console.log(userId);
    if (userId) {sockets[userId]=socket
        socket.join("room1");
    };
    
    //Actualiza Usuarios
    userCount++;
    io.emit('count_updated',{count:userCount});
    socket.on('disconnect',function(){
        userCount--;
        Object.keys(sockets).forEach(userId=>{
            let s = sockets[userId];
        if (s != null){
        if(s.id == socket.id) sockets[userId] = null;
        }
        });
    });
    io.on('room',function(arg){
    console.log("entro en room")
    io.to("room1").emit('HolaMundo',{ message: `Hello from the server:`});
})
     
});
io.on('room2',function(arg){
    console.log("entro en room2")
    io.to("room1").emit('HolaMundo',{ message: `Hello from the server:2`});
})
/*
io.timeout(5000).emit("boton");
io.on('boton',function(){
    console.log("Entro en el boton")
    Object.keys(sockets).forEach(user=>{
        let s = sockets[user];
    if (s != null){
     io.to(s).emit('HolaMundo',{ message: `Hello from the server:${user}`});
    }
    });
})*/

const client = mqtt.connect('mqtt://0.0.0.0:1883');

client.on('connect', function () {
    console.log('Connected to MQTT broker');
    client.subscribe('presence', function (err) {
        if (!err) {
          client.publish('presence', 'Hello mqtt');
        }
      });
});

client.on('message', function (topic, message) {
    console.log(`Received message: ${message} on topic: ${topic}`);
});

client.publish('presence', 'Hello MQTT');