import yup from "yup";

async function validateSignUpUser(req, res, next) {
    try {
        const schema = yup.object().shape({
            email: yup.string().email().required(),
            pseudo: yup.string().required(),
            password: yup.string().required(),
            role: yup.string().required(),
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

export default validateSignUpUser;

