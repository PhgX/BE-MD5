import {Router} from "express";
import UserController from "../controller/api/user.api";
import {auth} from '../middleware/auth';
export const userProfileRouter = Router();
import ProfileController from "../controller/api/profile.api";

userProfileRouter.get('',UserController.getAllUsers);
userProfileRouter.post('',UserController.createUser);
userProfileRouter.put('/:id',UserController.updateUser);
userProfileRouter.get('/username',UserController.getSingleUserByUsername);
userProfileRouter.get('/getUserToLocalstorage',auth,UserController.getUserToLocalStorage);
userProfileRouter.get('/detail/:id',ProfileController.getProfile);

//update
