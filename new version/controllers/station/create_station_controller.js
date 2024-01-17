import axios from 'axios'; // Assurez-vous d'installer axios avec "npm install axios"
import sharp from 'sharp';
import fs from 'fs';
import Station from "./../../models/station.model.js";

const createStation = async (req, res) => {
    const { name, open_hour, close_hour, image } = req.body;

    try {
        // Vérifiez si un lien d'image a été fourni
        if (!image) {
            return res.status(400).json({
                success: false,
                message: 'Veuillez fournir un lien vers une image.',
            });
        }

        // Téléchargez l'image à partir du lien
        const response = await axios.get(image, { responseType: 'arraybuffer' });

        // Redimensionnez l'image à 200 x 200 px
        const resizedImageBuffer = await sharp(response.data)
            .resize(200, 200)
            .toBuffer();

        // Spécifiez le chemin du dossier de destination
        const destinationPath = await generatePathImage();

        // Écrivez le fichier redimensionné dans le dossier de destination
        fs.writeFileSync(destinationPath, resizedImageBuffer);

        // Enregistrez la station dans la base de données
        const station = new Station({ name, open_hour, close_hour, image: destinationPath });
        await station.save();

        res.status(201).json({
            success: true,
            message: 'Station créée avec succès.',
            station: station,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default createStation;



export const generatePathImage = async () => {

    // Vérifier si le répertoir qrcode-images existe, sinon le créer
    if (!fs.existsSync('stations_image')) {
        fs.mkdirSync('stations_image');
    }

    // Vérifier si le répertoire correspondant à clientId existe, sinon le créer
    const imageDir = `stations_image`;

    try {

        const saveImagePath = imageDir + `/${Date.now()}.jpg`;
        return saveImagePath;

    } catch (error) {
        throw error;
    }
}