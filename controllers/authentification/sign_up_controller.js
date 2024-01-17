import bcrypt from "bcrypt";
import { DateTime } from "luxon";
import jwt from 'jsonwebtoken';
import User from '../../models/users.model.js';

import passport from 'passport';
import LocalStrategy from 'passport-local';

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// methodes pour gerer l'inscription d'un utilisateur
const signUpUser = async (req, res) => {
    const { email, pseudo, password, role } = req.body;

    try {
        const existingUser = await User.findOne({ "email": email });

        // l'utilisateur existe deja
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Cette adresse e-mail est déjà enregistrée. Veuillez réessayer avec une autre !",
            });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const currentDate = new Date(DateTime.now());
        const dateRegistration = currentDate;


        const user = new User(
            {
                email,
                pseudo,
                role,
                password: hashedPassword,
                dateRegistration,
            });


        // Utilisons Passport-local-mongoose pour enregistrer l'utilisateur et gérer le mot de passe
        await User.register(user, password);


        // Générez un jeton JWT
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


        res.json({
            success: true,
            message: "Inscription éffectuer avec succès !",
            token,
        });



    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};





export default signUpUser;