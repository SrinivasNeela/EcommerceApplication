<<<<<<< HEAD
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config =require('../config/database')
const AdminModule =require('../modules/admin')
const CustomerModule =require('../modules/customer')
module.exports = passport => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
             var admin =await AdminModule.findAdminById(jwt_payload._id)
             var customer =await CustomerModule.findCustomerById(jwt_payload._id)
             if (admin)
                return done(null, admin);
            else if(customer) 
                    return done(null, customer);
            else 
                return done(null, false);
            
        } catch (err) {
            return done(err, false);
        }
    }));
=======
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const config =require('../config/database')
const AdminModule =require('../modules/admin')
const CustomerModule =require('../modules/customer')
module.exports = passport => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = config.secret
    passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
        try {
             var admin =await AdminModule.findAdminById(jwt_payload._id)
             var customer =await CustomerModule.findCustomerById(jwt_payload._id)
             if (admin)
                return done(null, admin);
            else if(customer) 
                    return done(null, customer);
            else 
                return done(null, false);
            
        } catch (err) {
            return done(err, false);
        }
    }));
>>>>>>> 48c1ab277a6f6fa7956ef62b8e8975ff9ce86409
}