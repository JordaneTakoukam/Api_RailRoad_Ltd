import express from "express";

// yup validate
import validateSignUpUser from "./../middlewares/auth_validate/validate_sign_up_user.js";
import validateSignInUser from "./../middlewares/auth_validate/validate_sign_in_user.js";

// middleware
import { isAdmin, isAdminOrAuthorizedUser, isAdminOrEmployedOrAuthorizedUser, justVerifiyHeaderTokenAuthorization } from "../middlewares/_app_middleware.js";


// validate
import validateRequestParams from "./../middlewares/request_params/validate_request_params.js";


// controller
import signUpUser from "./../controllers/authentification/sign_up_controller.js";
import signInUser from "./../controllers/authentification/sign_in_controller.js";
//
import getUsers from "../controllers/user_management/get_users_controller.js";
import getUser from "../controllers/user_management/get_user_controller.js";
import deleteUser from "../controllers/user_management/delete_user_controller.js";
import updateUser from "../controllers/user_management/update_user_controller.js";
import createUser from "../controllers/user_management/create_user_controller.js";

const router = express.Router();


// auth
router.post("/auth/sign-up", validateSignUpUser, signUpUser);
router.post("/auth/sign-in", validateSignInUser, signInUser);



// crud client
router.get("/crud/get-users", isAdmin, getUsers); // seulement admin
router.get("/crud/get/:userId", validateRequestParams, isAdminOrEmployedOrAuthorizedUser, getUser); // admin ou employed ou Autorized user
router.post("/crud/update/:userId", isAdminOrAuthorizedUser, updateUser);
router.post("/crud/create", validateSignUpUser, createUser);
router.post("/crud/delete/:userId", validateRequestParams, justVerifiyHeaderTokenAuthorization, deleteUser); // j'ai besoin de l'uid en params pour verifier si c'est bien le mm utilisateur qui execute la requete, dans ce cas il peut supprimer sont comptes


export default router;
