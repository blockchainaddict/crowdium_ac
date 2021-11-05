function authMiddleware(req,res,next){
    if(req.session.userToLog != undefined){
        next();
    }
    else{
        res.send('Crea un usuario o logueate');
    }
}

module.exports = authMiddleware;