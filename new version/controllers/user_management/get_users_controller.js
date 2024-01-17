import User from "../../models/users.model.js";


// Contrôleur pour obtenir tous les utilisateurs
const getUsers = async (_, res) => {
    try {
        const allUsers = await User.find({}, '_id email pseudo role');
        const formattedUsers = allUsers.map(user => ({ role: user.role, userId: user._id, email: user.email, pseudo: user.pseudo }));

        return res.json({
            success: true,
            users: formattedUsers
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur.'
        });
    }
};

export default getUsers;