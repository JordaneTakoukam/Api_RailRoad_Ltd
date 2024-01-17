import Ticket from "./../../models/ticket_model.js";
import Train from "./../../models/train.model.js";
import { DateTime } from "luxon";

// Fonction pour réserver un ticket

/*
   - j'ai fixer le montant du prix du ticket a 20 Euro
   - la validiter du ticket est de 3 jours
   - le numero de est aleatoire
*/
const ticketReservation = async (req, res) => {
    const { userId, trainId, amount } = req.body;

    try {
        // Vérifier si le train et l'utilisateur existent
        const train = await Train.findById(trainId);
        if (!train) {
            return res.status(400).json({
                success: false,
                message: 'Train non trouvé.',
            });
        }

        // le montant du ticket est fixer par defaut a 20 Euro
        // vu qu'aucune precision n'as ete donner dans l'exercice !

        if (amount === 20) {

            // Générer un nombre de places aléatoire entre 0 et 50
            const randomSeatNumber = Math.floor(Math.random() * 51);

            const currentDate = new Date(DateTime.now());
            const expirationDate = new Date(DateTime.now().plus({ day: 3 }));

            // Créer un nouveau ticket
            const newTicket = new Ticket({
                creationDate: currentDate,
                expirationDate,
                userId: userId,
                trainId: trainId,
                seat_number: randomSeatNumber,
                price: amount,
                devise: "EUR"
            });

            // Enregistrez le ticket dans la base de données
            await newTicket.save();

            res.status(201).json({
                success: true,
                message: 'Ticket réservé avec succès.',
                ticket: newTicket,
            });
        } else {
            res.status(401).json({
                success: false,
                message: "Le montant prix d'un ticket est de 20 Euro",
            });
        }

    } catch (error) {
        console.error("Erreur : ", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};



export default ticketReservation;
