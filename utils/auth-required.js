
module.exports = function (req, res, next) {
	//if user not active then redirect to login pages
    if (req.user && req.user.active) return next();  

    res.redirect('/account/login?next=' + req.originalUrl);
};
