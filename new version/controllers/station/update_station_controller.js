import axios from 'axios';
import sharp from 'sharp';
import fs from 'fs';
import Station from "./../../models/station.model.js";
import generatePathImage from "./../../controllers/station/create_station_controller.js";


const updateStation = async (req, res) => {
    const { stationId } = req.params;
    const { name, open_hour, close_hour, image } = req.body;

    try {
        // Recuperer la station actuelle de la base de données
        const currentStation = await Station.findById(stationId);

        if (!currentStation) {
            return res.status(404).json({
                success: false,
                message: 'Station non trouvée.',
            });
        }

        // Supprimez l'ancienne image si elle existe et si la nouvelle image est fournie
        if (currentStation.image && image) {
            fs.unlinkSync(currentStation.image);
            console.log('Ancienne image supprimée avec succès.');
        }

        // verifiez et mettez à jour le nom si fourni
        if (name) {
            currentStation.name = name;
        }

        // verifiez et mettez à jour les heures d'ouverture et de fermeture si fournies
        if (open_hour) {
            currentStation.open_hour = open_hour;
        }

        if (close_hour) {
            currentStation.close_hour = close_hour;
        }

        // Si une nouvelle image est fournie, téléchargez-la et mettez à jour l'URL
        if (image) {
            const response = await axios.get(image, { responseType: 'arraybuffer' });
            const resizedImageBuffer = await sharp(response.data)
                .resize(200, 200)
                .toBuffer();

            const newImagePath = await generatePathImage();
            fs.writeFileSync(newImagePath, resizedImageBuffer);

            // Mettez à jour la station avec la nouvelle image
            currentStation.image = newImagePath;
            console.log('Nouvelle image téléchargée et URL mise à jour avec succès.');
        }

        if (name || image || open_hour || close_hour) {
            // Sauvegardez les modifications dans la base de données
            await currentStation.save();

            res.status(200).json({
                success: true,
                message: `Station : ${currentStation.name}, mise à jour avec succès.`,
            });
        } else {


            res.status(200).json({
                success: true,
                message: `Aucune donnees a mettre à jour avec succès !`,
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

export default updateStation;
