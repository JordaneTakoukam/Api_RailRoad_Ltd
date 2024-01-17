import User from "../../models/users.model.js";

/*
✅ un utilisateur normal (client) peut recuperer uniquement ses info et non ceux de tout autres 
✅ un employer peut recuperer les info uniquement des client* (ne peut pas recuperer ceux des autres employer, ni même admin)
✅ un admin ne peut pas recuperer les info d'un autres admin
*/

// Contrôleur pour obtenir un utilisateur par son ID
const getUser = async (req, res) => {
    try {
        const userId = req.params.userId;

        // Récupérez l'utilisateur par son ID
        const user = await User.findById(userId, "_id email pseudo role");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Utilisateur non trouvé."
            });
        }

        // Vérifiez si l'utilisateur actuel est un administrateur
        const isAdmin = req.user.role === "admin";
        const isMe = req.user.userId === userId;


        // une admin ne peut pas recuperer les info d'un autres admin
        if (user.role === "admin" && !isMe) {
            return res.status(403).json({
                success: false,
                message: 'Accès non autorisé. Rôle insuffisant.'
            });

        }
        /* Si l'utilisateur demandé est un administrateur ou un employer et l'utilisateur actuel n'est pas un administrateur*/
        else if ((user.role === "admin" || user.role === "employed") && !isAdmin) {
            return res.status(403).json({
                success: false,
                message: 'Accès non autorisé. Rôle insuffisant.'
            });
        }

        // Formatez l'utilisateur si nécessaire
        const formattedUser = {
            userId: user._id,
            email: user.email,
            pseudo: user.pseudo,
            role: user.role,
        };

        return res.json(formattedUser);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Erreur interne du serveur."
        });
    }
};



export default getUser;
