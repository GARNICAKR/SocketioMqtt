//Obtiene los datos de la session activa
const db= require("../database")
module.exports= async function (req,res,next){
    if(!req.session.userId) return  next();
    let id=req.session.userId
    const user= await db.query('SELECT * FROM users WHERE ID = ?',[id])
        if(user){
            req.user=user[0];
            return next();
        }

};
