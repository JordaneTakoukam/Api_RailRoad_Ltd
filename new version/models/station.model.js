import mongoose from 'mongoose';


const stationShema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    open_hour: { type: String, required: true },
    close_hour: { type: String, required: true },
    image: { type: String, required: true },
});


const Station = mongoose.model('Station', stationShema, "stations");

export default Station;
