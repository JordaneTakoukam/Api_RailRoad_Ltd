import Station from "./../../models/station.model.js";
import Train from "./../../models/train.model.js";
import fs from 'fs';

const deleteStation = async (req, res) => {
    const { stationId } = req.params;

    try {
        // Récupérez le chemin de l'image à partir de la base de données
        const station = await Station.findById(stationId);

        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Gare non trouvée.',
            });
        }

        const imagePath = station.image;

        // Trouver tous les trains associés à la station
        const trains = await Train.find({ start_station_Id: stationId });

        // Supprimer chaque train de la base de données
        for (const train of trains) {
            await Train.findByIdAndDelete(train._id);
        }

        // Supprimez la station de la base de données en utilisant l'identifiant
        await Station.findByIdAndDelete(stationId);

        // Supprimez le fichier image associé
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
            console.log('Fichier image supprimé avec succès.');
        } else {
            console.log('Le fichier image n\'existe pas.');
        }

        res.status(200).json({
            success: true,
            message: `Gare : ${station.name}, supprimer avec succès.`,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default deleteStation;
