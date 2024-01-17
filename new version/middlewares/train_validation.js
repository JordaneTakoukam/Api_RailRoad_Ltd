import yup from "yup";

async function validateTrain(req, res, next) {
    try {
        const schema = yup.object().shape({
            name: yup.string().required(),
            start_station_Id: yup.string().required(),
            end_station_Id: yup.string().required(),
            time_of_departure: yup.string().required(),
        });

        const validatedData = await schema.validate(req.body);
        req.validatedData = validatedData;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

export default validateTrain;