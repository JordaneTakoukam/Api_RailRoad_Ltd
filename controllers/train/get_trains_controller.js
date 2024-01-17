import Train from "./../../models/train.model.js";
import Station from "./../../models/station.model.js";

const getTrains = async (req, res) => {
    const { limit, time_of_departure, start_station_name, end_station_name } = req.body;

    try {
        const limitValue = parseInt(limit) || 10;

        let query = {};

        if (start_station_name || end_station_name) {
            if (start_station_name) {
                const startStation = await Station.findOne({ name: start_station_name });

                if (!startStation) {
                    return res.status(404).json({
                        success: false,
                        message: 'Start station not found',
                    });
                }
                query.start_station = startStation._id;
            }

            if (end_station_name) {
                const endStation = await Station.findOne({ name: end_station_name });

                if (!endStation) {
                    return res.status(404).json({
                        success: false,
                        message: 'End station not found',
                    });
                }
                query.end_station = endStation._id;
            }
        }

        if (time_of_departure) {
            // Convert the string to a Date object
            const departureDate = new Date(time_of_departure);
            if (isNaN(departureDate.getTime())) {
                return res.status(400).json({
                    success: false,
                    message: 'Invalid date format for time_of_departure',
                });
            }
            query.time_of_departure = { $gte: departureDate };
        }

        const trains = await Train.find(query).limit(limitValue).sort({ time_of_departure: 1 });

        res.status(200).json({
            success: true,
            trains: trains,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            success: false,
            message: 'Internal server error!',
            error: error.message,
        });
    }
};

export default getTrains;
