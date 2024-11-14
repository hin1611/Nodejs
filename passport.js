import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import User from './models/User.js'; // Đảm bảo đường dẫn đúng

// Xác thực người dùng
passport.use(new LocalStrategy(
    async (username, password, done) => {
        try {
            const user = await User.findOne({ where: { username } });
            if (!user) return done(null, false, { message: 'Incorrect username.' });

            // So sánh mật khẩu trực tiếp (không mã hóa)
            if (password !== user.password) {
                return done(null, false, { message: 'Incorrect password.' });
            }

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Serialize user
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (err) {
        done(err);
    }
});

export default passport;
