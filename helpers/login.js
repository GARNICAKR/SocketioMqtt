const db= require("../database")
let Login={}
Login.login= async function(username,password){
   const user=await db.query('SELECT * FROM users WHERE username = ?',[username]);
   if(!user){console.log("Usuario No Encontrado"); return null}
   else{
       if(user[0].password==password){
           return user[0]
       }
       else{
           console.log("Contraseña incorrecta");
           return null
       }
   }

    return null
}
module.exports=Login;