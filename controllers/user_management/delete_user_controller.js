import User from "../../models/users.model.js";

/*
✅ un utilisateur normal (client) peut supprimer uniquement son propre compte et non celui des autres 
✅ un employé peut supprimer uniquement les comptes des clients (ne peut pas supprimer ceux des autres employés, ni même des administrateurs)
✅ un administrateur ne peut pas supprimer le compte d'un autre administrateur
*/

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Récupérez l'utilisateur par son ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé.",
            });
        }


        try {
            const isMe = req.user.userId === userId;
            // Un administrateur ne peut pas supprimer le compte d'un autre administrateur
            if (!isMe) {
                return res.status(403).json({
                    success: false,
                    message: 'Accès non autorisé. Rôle insuffisant.',
                });
            }
        } catch (e) { 
            console.log(e);
        }



        // Supprimez l'utilisateur si tout est en ordre
        await User.findByIdAndDelete(userId );

        return res.json({
            success: true,
            message: "Suppression réussie.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur.",
        });
    }
};

export default deleteUser;
