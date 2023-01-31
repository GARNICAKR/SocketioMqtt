//Sirve para autenticar las paginas que puede ingresar una persona no registrada,
//Esta mejor el metodo que tengo en el Proyecto Hospital
module.exports=function(req,res,next){//Los middleaware tienen tres parametros req,res,next

    if(req.session.userId) return next();
    res.redirect('/sessions');
};