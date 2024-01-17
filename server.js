import express from "express"; // Framework Express pour la création d'applications web
import dotenv from "dotenv"; // Dotenv pour charger les variables d'environnement
import cors from "cors"; // Middleware CORS pour gérer les requêtes cross-origin
import session from "express-session";

// connexion a mongodb online
import connectMongoDB from "./database/connection_database.js";

// routes 
import defaultRoutes from "./routes/default.route.js"
import userRoutes from "./routes/user.routes.js"
import trainRoutes from "./routes/train.routes.js"
import stationRoutes from "./routes/station.routes.js"
import ticketRoutes from "./routes/ticket.routes.js"

const app = express(); // Création d'une instance de l'application Express
app.use(cors()); // Activation du CORS pour toutes les routes
app.use(express.json({ limit: "50mb" })); // Analyse des corps de requête entrants au format JSON

dotenv.config(); // Chargement des variables d'environnement à partir du fichier .env


// Configurer express-session
app.use(session({ secret: process.env.SECRET_KEY, resave: false, saveUninitialized: false, }));


// routes de l'api
app.use("/", defaultRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/train", trainRoutes);
app.use("/api/v1/station", stationRoutes);
app.use("/api/v1/ticket", ticketRoutes);



connectMongoDB(process.env.MONGODB_URL)
    .then(() => {
        app.listen(
            process.env.PORT,
            async () => {
                console.log(`🚀💥 Serveur en cours d\'exécution sur http://localhost:${process.env.PORT}`);
            });
    })
    .catch((error) => {
        console.log(error);
        process.exit(1); // Quitter le processus avec un code d'erreur en cas d'échec
    });