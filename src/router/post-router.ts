
import { Router } from "express";
import { auth } from "../middleware/auth";
import postController from '../controller/api/post.api';
import routerCommnet from './comment-router';
const routerPost = require('express').Router();
//COMMENT ROUTER
// routerPost.use('/comments',routerCommnet)

//LIKE ROUTER
// routerPost.use("/likes", routerLike);

//GET POST
routerPost.get("/:id",auth, postController.getAllPostById);





//ADD POST
routerPost.post("",auth, postController.addNewPost);

//UPDATE POST
routerPost.put("/:id",auth, postController.updatePost);

//DELETE POST
routerPost.delete("/:id",auth, postController.DeletePostById);





export default routerPost;
