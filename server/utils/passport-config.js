const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initializePassport(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        const user = await getUserByUsername(username)
        if (user === undefined) {
            return done(null, false, {message: 'No user with that username'})
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user, {message: 'Login successful'})
            } else {
                return done(null, false, {message: 'Password incorrect'})
            }
        } catch (err) {
            return done(err)
        }
    }

    passport.use(new LocalStrategy({usernameField: 'username'}, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
    })
}

module.exports = initializePassport