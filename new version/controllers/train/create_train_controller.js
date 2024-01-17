import Train from "./../../models/train.model.js";
import Station from "./../../models/station.model.js";
import { DateTime } from "luxon";
// 1
const createTrain = async (req, res) => {
    const { name, start_station_Id, end_station_Id, time_of_departure } = req.body;

    try {
        // Vérifier si les stations de départ et d'arrivée existent
        const startStation = await Station.findById(start_station_Id);

        if (!startStation) {
            return res.status(400).json({
                success: false,
                message: 'La gare de départ spécifiées n\'existent pas ou plus !',
            });
        }

        const endStation = await Station.findById(end_station_Id);


        if (!endStation) {
            return res.status(400).json({
                success: false,
                message: 'La gare d\'arrivée spécifiées n\'existent pas ou plus !',
            });
        }


        if (startStation._id.toString() === endStation._id.toString()) {
            return res.status(400).json({
                success: false,
                message: "La gare de départ ne peut pas etre la même que celle d'arrivée!",
            });
        }
        const currentDate = new Date(DateTime.now());

        const newTrain = new Train({
            name: name,
            start_station_Id: start_station_Id,
            end_station_Id: end_station_Id,
            time_of_departure: time_of_departure,
            creationDate: currentDate,
        });

        await newTrain.save();

        res.status(201).json({
            success: true,
            message: 'Train créé avec succès.',
            train: newTrain,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default createTrain;
