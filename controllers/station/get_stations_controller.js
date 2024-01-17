import Station from "./../../models/station.model.js";

const getStations = async (req, res) => {
    try {
        // Récupérez la liste de toutes les stations depuis la base de données
        const stations = await Station.find();

        res.status(200).json({
            success: true,
            stations: stations,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default getStations;
