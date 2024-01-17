import Train from "./../../models/train.model.js";

const updateTrain = async (req, res) => {
    const { trainId } = req.params;
    const { name, start_station_Id, end_station_Id, time_of_departure } = req.body;

    try {
        // Récupérez le train actuel de la base de données
        const currentTrain = await Train.findById(trainId);

        if (!currentTrain) {
            return res.status(404).json({
                success: false,
                message: 'Train non trouvé.',
            });
        }

        // Vérifiez et mettez à jour le nom si fourni
        if (name) {
            currentTrain.name = name;
        }

        // Vérifiez et mettez à jour la station de départ si fournie
        if (start_station_Id) {
            currentTrain.start_station_Id = start_station_Id;
        }

        // Vérifiez et mettez à jour la station d'arrivée si fournie
        if (end_station_Id) {
            currentTrain.end_station_Id = end_station_Id;
        }

        // Vérifiez et mettez à jour le temps de départ si fourni
        if (time_of_departure) {
            currentTrain.time_of_departure = time_of_departure;
        }

        // Si des modifications ont été apportées, sauvegardez dans la base de données
        if (name || start_station_Id || end_station_Id || time_of_departure) {
            await currentTrain.save();

            res.status(200).json({
                success: true,
                message: `Train : ${currentTrain.name}, mis à jour avec succès.`,
            });
        } else {
            res.status(200).json({
                success: true,
                message: 'Aucune donnée à mettre à jour avec succès !',
            });
        }
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default updateTrain;
