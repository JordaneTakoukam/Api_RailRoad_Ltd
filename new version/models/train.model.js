import mongoose from 'mongoose';


const trainsShema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    start_station_Id: { type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    end_station_Id:{ type: mongoose.Schema.Types.ObjectId, ref: 'Station', required: true },
    time_of_departure: { type: String, required: true },
    creationDate: { type: Date, required: true },
});


const Train = mongoose.model('Train', trainsShema, "trains");

export default Train;
