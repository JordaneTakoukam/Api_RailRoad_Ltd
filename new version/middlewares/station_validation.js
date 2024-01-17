import yup from "yup";

async function validateStation(req, res, next) {
    try {
        const schema = yup.object().shape({
            name: yup.string().required(),
            open_hour: yup.string().required(),
            close_hour: yup.string().required(),
            image: yup.string().required(),
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

export default validateStation;