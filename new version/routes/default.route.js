import express from "express";

const router = express.Router();

router.get("/", (_, res) => {
    res.status(200).json({
        message: "Bienvenue sur l'Api Rest Full de Rail RailRoad LTD",
    });
});




export default router;