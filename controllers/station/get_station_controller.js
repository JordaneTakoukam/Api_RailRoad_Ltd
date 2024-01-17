import Station from "./../../models/station.model.js";

const getStation = async (req, res) => {
    const { stationId } = req.params;

    try {
        // recupererez la station selon l'id de la gare
        const station = await Station.findById(stationId);

        if (!station) {
            return res.status(404).json({
                success: false,
                message: 'Gare non trouvée.',
            });
        }

        res.status(200).json({
            success: true,
            gare: station,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};
export default getStation;
