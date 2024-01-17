import bcrypt from "bcrypt";
import User from "../../models/users.model.js";


/*
✅ seul un admin peut modifier les information d'un client ou d'un employer
✅ un utilisateur n'as la possibilite que de modifier ses proporres informations
✅ un admin ne peut pas modifier les info d'un autre admin
*/
const updateUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { email, password, pseudo } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé.",
            });
        }

        try {
            const isMe = req.user.userId === userId;

            if (user.role === "admin" && !isMe) {
                return res.status(403).json({
                    success: false,
                    message: 'Accès non autorisé. Rôle insuffisant.'
                });
            }
        } catch (e) {
            console.log(e);
        }

        // Mise à jour des champs si les valeurs sont fournies
        if (email) user.email = email;
        if (pseudo) user.pseudo = pseudo;
        if (password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            user.password = hashedPassword;
        }


        // aucune valeur renseigner en body de la requete
        if (!email && !pseudo && !password) {

            res.json({
                success: true,
                message: "Rien a mettre a jour !",
                user,
            });
        } else {
            await user.save();

            res.json({
                success: true,
                message: "Utilisateur mis a jour !",
                user,
            });
        }



        // suite 
    } catch (e) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }

};

export default updateUser;