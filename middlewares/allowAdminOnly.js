/**
 * Allow only admin access to certain routes
 * @param {*} req - Request
 * @param {*} res - Response
 * @param {*} next - Next
 */
const allowAdminOnly = function(req, res, next) {
    if(!req.user.is_admin) {
        res.sendStatus(401);
        return;
    }
    next();
}

module.exports = allowAdminOnly;