import express from "express";

// middleware
import { isAdmin, justVerifiyHeaderTokenAuthorization } from "./../middlewares/_app_middleware.js";


// validate
import validateRequestParams from "./../middlewares/request_params/validate_request_params.js";
import validateStation from "./../middlewares/station_validation.js";

// controllers
import getStation from "./../controllers/station/get_station_controller.js";
import getStations from "./../controllers/station/get_stations_controller.js";
import createStation from "./../controllers/station/create_station_controller.js";
import updateStation from "./../controllers/station/update_station_controller.js";
import deleteStation from "./../controllers/station/delete_station_controller.js";


const router = express.Router();


// crud station
router.get("/get/:stationId", justVerifiyHeaderTokenAuthorization, validateRequestParams, getStation); // on verifie le params, on verifie le token, avant de continuer...
router.get("/get-stations", justVerifiyHeaderTokenAuthorization, getStations); //
router.post("/create", isAdmin, validateStation, createStation);
router.post("/update/:stationId", isAdmin, validateRequestParams, updateStation);
router.delete("/delete/:stationId", isAdmin, validateRequestParams, deleteStation);


export default router;
