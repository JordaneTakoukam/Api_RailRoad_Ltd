import Ticket from './../../models/ticket_model.js';
import { DateTime } from 'luxon';

const ticketValidation = async (req, res) => {
    const { ticketCode } = req.params;

    try {
        // Vérifier si le ticket existe
        const ticket = await Ticket.findOne({ _id: ticketCode });

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: 'Ticket non trouvé.',
            });
        }

        // Vérifier si le ticket est expiré
        const currentDate = DateTime.now();
        const expirationDate = DateTime.fromJSDate(ticket.expirationDate);

        if (currentDate > expirationDate) {
            return res.status(400).json({
                success: false,
                message: 'Ticket expiré.',
            });
        }

        if (ticket.use == false) {
            return res.status(401).json({
                success: false,
                message: 'Ticket déjà utilisé.',
            });
        }

        // Si le ticket est encore valide, vérifier s'il est déjà utilisé ou non
        ticket.use = true;

        await ticket.save();

        res.status(200).json({
            success: true,
            message: 'Ticket valide.',
            ticket: ticket,
        });

    } catch (error) {
        console.error("Erreur : ", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
            error: error.message,
        });
    }
};

export default ticketValidation;
