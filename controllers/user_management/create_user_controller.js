import bcrypt from "bcrypt";
import User from "../../models/users.model.js";
import { DateTime } from "luxon";

const createUser = async (req, res) => {
    try {
        const { email, password, pseudo, role } = req.body;

        // Vérifiez si l'utilisateur actuel est un administrateur
        // const isAdmin = req.user.role === "admin";

        // // Un administrateur est nécessaire pour créer un nouvel utilisateur
        // if (!isAdmin) {
        //     return res.status(403).json({
        //         success: false,
        //         message: 'Accès non autorisé. Rôle insuffisant.',
        //     });
        // }

        // Vérifiez si l'utilisateur avec l'adresse e-mail fournie existe déjà
        const existingUser = await User.findOne({ "email": email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Cette adresse e-mail est déjà enregistrée. Veuillez réessayer avec une autre !",
            });
        }

        // Hachez le mot de passe avant de l'enregistrer dans la base de données
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Créez un nouvel utilisateur

        const currentDate = new Date(DateTime.now());
        const dateRegistration = currentDate;

        const newUser = new User(
            {
                email,
                pseudo,
                role,
                password: hashedPassword,
                dateRegistration,
            });


        // Enregistre le nouvel utilisateur dans la base de données
        await User.register(newUsera, password);

        res.json({
            success: true,
            message: "Utilisateur créé avec succès !",
            user: {
                userId: newUser._id,
                email: newUser.email,
                pseudo: newUser.pseudo,
                role: newUser.role,
                dateRegistration: dateRegistration,
            },
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default createUser;
