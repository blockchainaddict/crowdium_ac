function guestMiddleware(req,res,next){
    if(req.session.userToLog == undefined){
        console.log('no user found');
        next();
    }
    else{
        console.log('user found');
        res.send('You already have an account');
    }
}

module.exports = guestMiddleware;