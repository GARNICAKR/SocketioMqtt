const db= require("../database")
module.exports={
    create:async function(req,res){
        const {username,password,fullname}=  req.body
        const NewUser={
          username,
          password,
          fullname
        };
        await db.query('INSERT INTO users set ?',[NewUser]);
        res.send("PK");
        },
        index: async(req,res)=>{
            const users=await db.query('SELECT * FROM users');
            console.log(users);
            res.render('users/index',{users:users});
        },
        new: (req,res)=>{
            res.render('users/new');
        },
        show:async (req,res)=>{
            const {id}=req.params;
            const user=await db.query('SELECT * FROM users WHERE ID = ?',[id]);
            console.log(user);
            res.render('users/show',{user:user[0]});          
        },
};