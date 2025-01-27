const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;

// Load User model
const Usuario = mongoose.model('usuarios');

module.exports = function (passport) {
    passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
        try {
            const user = await Usuario.findOne({ email: email });
            if (!user) {
                return done(null, false, { message: 'No user found' });
            }

            const isMatch = await bcrypt.compare(password, user.senha);
            if (isMatch) {
                return done(null, user);
            } else {
                return done(null, false, { message: 'Password incorrect' });
            }
        } catch (err) {
            return done(err);
        }
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await Usuario.findById(id);
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
};