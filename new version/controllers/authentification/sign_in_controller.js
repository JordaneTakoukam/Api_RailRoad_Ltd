import jwt from 'jsonwebtoken';
import User from '../../models/users.model.js';

import passport from 'passport';
import LocalStrategy from 'passport-local';


// changer le champs username en : email !!
passport.use(new LocalStrategy({ usernameField: 'email' }, User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


const signInUser = (req, res, next) => {
    passport.authenticate('local', (err, user, _) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Erreur interne du serveur",
                error: err,
            });

        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Utilisateurs non trouvé !",
            });
        }

        req.logIn(user, (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Erreur interne du serveur lors de la connexion",
                });
            }

            const token = jwt.sign(
                {
                    userId: user._id,
                    email: user.email,
                    pseudo: user.pseudo,
                    role: user.role,
                    dateRegistration: user.dateRegistration,
                },
                process.env.SECRET_KEY,
                { expiresIn: '24h' }
            );

            return res.json({
                success: true,
                message: "Connexion réussie",
                token,
            });
        });

    })(req, res, next);
};

export default signInUser;
