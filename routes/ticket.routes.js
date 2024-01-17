import express from "express";

// middleware                         
import { isAdminOrEmployed, justVerifiyHeaderTokenAuthorization } from "./../middlewares/_app_middleware.js";


// validate
import validateRequestParams from "./../middlewares/request_params/validate_request_params.js";
import validateTicket from "./../middlewares/ticket_validation.js"


// controllers
import ticketReservation from "./../controllers/ticket/ticket_reservation_controller.js";
import tickerValidation from "./../controllers/ticket/ticket_validate_controller.js";


const router = express.Router();


//
router.post("/reservation", justVerifiyHeaderTokenAuthorization, validateTicket, ticketReservation);
router.get("/validate/:ticketCode", isAdminOrEmployed, validateRequestParams, tickerValidation);


export default router;
