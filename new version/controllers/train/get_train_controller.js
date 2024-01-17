import Train from "./../../models/train.model.js";

const getTrain = async (req, res) => {
    const { trainId } = req.params;

    try {
        const train = await Train.findById(trainId);

        if (!train) {
            return res.status(404).json({
                success: false,
                message: 'Train non trouvé.',
            });
        }

        res.status(200).json({
            success: true,
            train: train,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default getTrain;
