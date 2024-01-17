import express from "express";

// middleware
import { isAdmin, justVerifiyHeaderTokenAuthorization } from "./../middlewares/_app_middleware.js";


// validate
import validateRequestParams from "./../middlewares/request_params/validate_request_params.js"
import validateTrain from "./../middlewares/train_validation.js"


// controllers
import getTrain from "./../controllers/train/get_train_controller.js"
import getTrains from "./../controllers/train/get_trains_controller.js"
import createTrain from "./../controllers/train/create_train_controller.js"
import updateTrain from "./../controllers/train/update_train_controller.js"
import deleteTrain from "./../controllers/train/delete_train_controller.js"


const router = express.Router();

// crud train
router.get("/get/:trainId", justVerifiyHeaderTokenAuthorization, validateRequestParams, getTrain);
router.post("/get-trains", justVerifiyHeaderTokenAuthorization, getTrains);
router.post("/create", isAdmin, validateTrain, createTrain);
router.post("/update/:trainId", isAdmin, validateRequestParams, updateTrain);
router.delete("/delete/:trainId", isAdmin, validateRequestParams, deleteTrain);


export default router;
