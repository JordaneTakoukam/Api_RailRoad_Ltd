import yup from "yup";

async function validateTicket(req, res, next) {
    try {
        const schema = yup.object().shape({
            userId: yup.string().required(),
            trainId: yup.string().required(),
            amount: yup.number().required(),
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

export default validateTicket;