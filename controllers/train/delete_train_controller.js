import Train from "./../../models/train.model.js";


const deleteTrain = async (req, res) => {
    const { trainId } = req.params;

    try {
        const deletedTrain = await Train.findByIdAndDelete(trainId);

        if (!deletedTrain) {
            return res.status(404).json({
                success: false,
                message: 'Train non trouvé.',
            });
        }

        res.status(200).json({
            success: true,
            message: `Train : ${deletedTrain.name} supprimé avec succès.`,
        });
    } catch (error) {
        console.error("Erreur :", error);
        res.status(500).json({
            success: false,
            message: 'Erreur interne du serveur !',
        });
    }
};

export default deleteTrain;
