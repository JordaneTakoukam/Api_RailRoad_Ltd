import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    trainId: { type: mongoose.Schema.Types.ObjectId, ref: 'Train', required: true },

    creationDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },

    seat_number: { type: String, required: true },
    price: { type: Number, required: true },
    devise: { type: String, default: "EUR" },

    use: { type: Boolean, default: false } // le ticket est deja utiliser
});


const Ticket = mongoose.model('Ticket', ticketSchema, 'tickets');

export default Ticket;
