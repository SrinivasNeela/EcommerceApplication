const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config =require('../config/database')
const AdminModule =require('../modules/admin')
module.exports = passport => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
             var admin =await AdminModule.findAdminById(jwt_payload._id)
             if (admin) {
                return done(null, admin);
            } else {
                return done(null, false);
            }
        } catch (err) {
            return done(err, false);
        }
    }));
}