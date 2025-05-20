const {getUser} = require('../service/auth.service')

async function restrictToLoggedinUserOnly(req,res,next) {
    const userUid=req.cookie?.uid;
    if(!userUid) return redirect('/user/login');
    const user=getUser(userUid)
    if(!user) return redirect('/user/login')
        req.user=user
        return next()
}

module.exports={
    restrictToLoggedinUserOnly}