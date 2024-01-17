import yup from "yup";

async function validateRequestParams(req, res, next) {
    try {
        const paramName = Object.keys(req.params)[0]; // Récupère le nom du paramètre dynamiquement

        const schema = yup.object().shape({
            [paramName]: yup.string().trim().length(24).matches(/^[0-9a-fA-F]{24}$/).required(),
        });

        const validatedParams = await schema.validate(req.params);
        req.validatedParams = validatedParams;
        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message,
        });
    }
}

export default validateRequestParams ;
