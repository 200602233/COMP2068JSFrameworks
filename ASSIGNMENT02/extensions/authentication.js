//lesson09 ref
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        next(); 
    } else {
        res.redirect("/login?lang={{lang}}");
    }
}

module.exports = ensureAuthenticated;